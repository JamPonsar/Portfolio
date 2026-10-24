// Grow a card into a full-screen panel and shrink it back to the same spot.
// Shared by the Projects and Experience sections; styles live in styles/panel.css.

type Options = {
  panel: HTMLElement;
  // Prepare the panel's content for this card (called before the animation).
  onOpen?: (card: HTMLElement) => void;
  // Called as soon as closing starts.
  onClose?: (card: HTMLElement) => void;
  // Called once the panel is fully hidden again.
  onClosed?: (card: HTMLElement) => void;
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const px = (r: DOMRect) => ({
  top: `${r.top}px`,
  left: `${r.left}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
});
const full = { top: '0px', left: '0px', width: '100vw', height: '100dvh' };

export function createExpander({ panel, onOpen, onClose, onClosed }: Options) {
  const inner = panel.querySelector<HTMLElement>('.xp-inner')!;
  const closeBtn = panel.querySelector<HTMLButtonElement>('.xp-close')!;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = reduce ? 0 : 1400;

  let activeCard: HTMLElement | null = null;
  let ghost: HTMLElement | null = null;
  let busy = false;

  async function open(card: HTMLElement) {
    if (busy || activeCard) return;
    busy = true;
    activeCard = card;

    const rect = card.getBoundingClientRect();
    onOpen?.(card);
    inner.scrollTop = 0;

    // A copy of the card sits inside the panel and fades out as it grows,
    // so the card's text doesn't vanish when the panel takes its place.
    ghost = card.cloneNode(true) as HTMLElement;
    ghost.removeAttribute('role');
    ghost.removeAttribute('tabindex');
    ghost.setAttribute('aria-hidden', 'true');
    ghost.classList.add('xp-ghost');
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    panel.prepend(ghost);

    document.documentElement.style.overflow = 'hidden';
    panel.hidden = false;

    ghost.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: DURATION * 0.45,
      easing: 'ease',
      fill: 'forwards',
    });
    const grow = panel.animate(
      [
        { ...px(rect), borderRadius: '24px' },
        { ...full, borderRadius: '0px' },
      ],
      { duration: DURATION, easing: EASE, fill: 'forwards' }
    );

    panel.classList.add('show');
    await grow.finished.catch(() => {});
    busy = false;
    closeBtn.focus({ preventScroll: true });
  }

  async function close() {
    if (busy || !activeCard) return;
    busy = true;
    const card = activeCard;
    onClose?.(card);

    panel.classList.remove('show');
    // The card hasn't moved while the panel was open, so this is where it started.
    const target = { ...px(card.getBoundingClientRect()), borderRadius: '24px' };

    ghost?.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: DURATION * 0.4,
      delay: DURATION * 0.55,
      easing: 'ease',
      fill: 'both',
    });
    const shrink = panel.animate(
      [
        { ...full, borderRadius: '0px', opacity: 1 },
        { ...target, opacity: 1, offset: 0.88 },
        { ...target, opacity: 0 },
      ],
      { duration: DURATION, easing: EASE, fill: 'forwards' }
    );
    await shrink.finished.catch(() => {});

    panel.getAnimations().forEach((a) => a.cancel());
    panel.hidden = true;
    ghost?.remove();
    ghost = null;
    document.documentElement.style.overflow = '';
    onClosed?.(card);
    card.focus({ preventScroll: true });
    activeCard = null;
    busy = false;
  }

  // Make a card open the panel on click, Enter or Space.
  function bind(card: HTMLElement) {
    card.addEventListener('click', () => open(card));
    card.addEventListener('keydown', (e) => {
      if (e.target === card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        open(card);
      }
    });
  }

  closeBtn.addEventListener('click', close);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  return { open, close, bind };
}
