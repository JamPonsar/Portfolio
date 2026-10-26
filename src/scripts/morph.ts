// Project card → full-screen panel, in three beats:
//   1. the card glides to the top middle of the screen,
//   2. its title grows into the panel heading while the background fills the screen,
//   3. the rest of the content fades in from top to bottom.
// Closing plays the same beats in reverse. Same API as createExpander in expand.ts.

type Options = {
  panel: HTMLElement;
  onOpen?: (card: HTMLElement) => void;
  onClose?: (card: HTMLElement) => void;
  onClosed?: (card: HTMLElement) => void;
  // Where the card's background is actually drawn, relative to its box (CSS inset
  // values, negative = outside), so the panel grows from what you see. Defaults to the box.
  surface?: (card: HTMLElement) => Surface;
};

type Surface = { top: number; right: number; bottom: number; left: number; radius: number };

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const EASE_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)';
const CARD_SURFACE: Surface = { top: 0, right: 0, bottom: 0, left: 0, radius: 24 };
const FULL = 'inset(0px 0px 0px 0px round 0px)';

type Box = { top: number; left: number; width: number; height: number };

export function createMorph({ panel, onOpen, onClose, onClosed, surface }: Options) {
  const inner = panel.querySelector<HTMLElement>('.xp-inner')!;
  const closeBtn = panel.querySelector<HTMLButtonElement>('.xp-close')!;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = (ms: number) => (reduce ? 0 : ms);

  const MOVE = t(600);
  const GROW = t(700);
  const STAGGER = t(80);
  const FADE_IN = t(550);
  const FADE_OUT = t(260);
  const STAGGER_OUT = t(35);

  let activeCard: HTMLElement | null = null;
  let ghost: HTMLElement | null = null;
  let busy = false;

  const done = (a: Animation) => a.finished.catch(() => {});

  // The visible detail's heading, and everything after it in reading order.
  function parts() {
    const detail = panel.querySelector<HTMLElement>('.xp-detail:not([hidden])')!;
    const title = detail.querySelector<HTMLElement>('h3')!;
    const rest = [
      panel.querySelector<HTMLElement>('.xp-bar')!,
      ...[...detail.children].filter((el): el is HTMLElement => el !== title),
    ];
    return { title, rest };
  }

  // Where the card parks: centred horizontally, high enough that its title lines up
  // with the panel heading it is about to become.
  function parkedBox(card: HTMLElement, title: HTMLElement): Box {
    const cardRect = card.getBoundingClientRect();
    const titleOffset = card.querySelector('h3')!.getBoundingClientRect().top - cardRect.top;
    const view = panel.getBoundingClientRect();
    return {
      top: Math.max(16, title.getBoundingClientRect().top - titleOffset),
      left: (view.width - cardRect.width) / 2,
      width: cardRect.width,
      height: cardRect.height,
    };
  }

  // Clip path matching the card's visible background when the card sits at `box`.
  function cardClip(card: HTMLElement, box: Box) {
    const s = surface?.(card) ?? CARD_SURFACE;
    return clip(
      {
        top: box.top + s.top,
        left: box.left + s.left,
        width: box.width - s.left - s.right,
        height: box.height - s.top - s.bottom,
      },
      s.radius
    );
  }

  function clip(box: Box, radius: number) {
    const view = panel.getBoundingClientRect();
    const right = view.width - box.left - box.width;
    const bottom = view.height - box.top - box.height;
    return `inset(${box.top}px ${right}px ${bottom}px ${box.left}px round ${radius}px)`;
  }

  // Transform that makes the panel heading sit exactly on the card's title.
  function titleInvert(card: HTMLElement, box: Box, title: HTMLElement) {
    const cardRect = card.getBoundingClientRect();
    const from = card.querySelector('h3')!;
    const fromRect = from.getBoundingClientRect();
    const to = title.getBoundingClientRect();
    const scale = parseFloat(getComputedStyle(from).fontSize) / parseFloat(getComputedStyle(title).fontSize);
    const x = box.left + (fromRect.left - cardRect.left) - to.left;
    const y = box.top + (fromRect.top - cardRect.top) - to.top;
    return `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function makeGhost(card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const el = card.cloneNode(true) as HTMLElement;
    el.removeAttribute('role');
    el.removeAttribute('tabindex');
    el.setAttribute('aria-hidden', 'true');
    el.classList.add('xp-ghost', 'xp-flying');
    Object.assign(el.style, {
      position: 'fixed',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: '0',
      zIndex: '1001',
      pointerEvents: 'none',
      transform: 'none',
    });
    document.body.append(el);
    return el;
  }

  // Hide the ghost's title text (the panel heading stands in for it), but keep any
  // extra bits inside the heading, like a company name, until the ghost fades.
  function hideTitle(g: HTMLElement, hidden: boolean) {
    const h3 = g.querySelector<HTMLElement>('h3')!;
    h3.style.visibility = hidden ? 'hidden' : '';
    h3.querySelectorAll<HTMLElement>(':scope > *').forEach((el) => (el.style.visibility = hidden ? 'visible' : ''));
  }

  async function open(card: HTMLElement) {
    if (busy || activeCard) return;
    busy = true;
    activeCard = card;

    onOpen?.(card);
    inner.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';

    // Lay the panel out invisibly so we can measure where the heading will be.
    panel.style.clipPath = 'inset(50%)';
    panel.hidden = false;
    const { title, rest } = parts();
    rest.forEach((el) => (el.style.opacity = '0'));
    title.style.opacity = '0';

    // 1. Glide the card to the top middle
    ghost = makeGhost(card);
    card.style.visibility = 'hidden';
    const start = card.getBoundingClientRect();
    const park = parkedBox(card, title);
    await done(
      ghost.animate(
        [
          { transform: 'none', boxShadow: '0 0 0 0 rgba(28, 26, 23, 0)' },
          {
            transform: `translate(${park.left - start.left}px, ${park.top - start.top}px)`,
            boxShadow: '0 40px 80px -40px rgba(28, 26, 23, 0.35)',
          },
        ],
        { duration: MOVE, easing: EASE_IN_OUT, fill: 'forwards' }
      )
    );

    // 2. Title grows into the heading, background fills the screen
    hideTitle(ghost, true);
    title.style.opacity = '';
    title.style.transformOrigin = '0 0';
    // The panel starts out exactly where the card is, so fading the whole card
    // (border and shadow included) hands over without leaving an outline behind.
    ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: GROW * 0.25, fill: 'forwards' });
    const titleGrow = title.animate(
      [{ transform: titleInvert(card, park, title) }, { transform: 'none' }],
      { duration: GROW, easing: EASE }
    );
    const fill = panel.animate([{ clipPath: cardClip(card, park) }, { clipPath: FULL }], {
      duration: GROW,
      easing: EASE,
      fill: 'forwards',
    });
    panel.style.clipPath = '';
    await Promise.all([done(titleGrow), done(fill)]);
    title.style.transformOrigin = '';
    ghost.style.opacity = '0';

    // 3. Everything else fades in, top to bottom
    const fades = rest.map((el, i) => {
      el.style.opacity = '';
      return el.animate(
        [
          { opacity: 0, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: FADE_IN, delay: i * STAGGER, easing: EASE, fill: 'backwards' }
      );
    });
    closeBtn.focus({ preventScroll: true });
    busy = false;
    await Promise.all(fades.map(done));
  }

  // Ease the panel back to its top so the heading is in view before it shrinks.
  function scrollToTop(duration: number) {
    const from = inner.scrollTop;
    if (!from || !duration) {
      inner.scrollTop = 0;
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        inner.scrollTop = from * (1 - (1 - Math.pow(1 - p, 3)));
        p < 1 ? requestAnimationFrame(step) : resolve();
      };
      requestAnimationFrame(step);
    });
  }

  async function close() {
    if (busy || !activeCard || !ghost) return;
    busy = true;
    const card = activeCard;
    const g = ghost;
    onClose?.(card);

    // 3. Content fades out, bottom to top
    const { title, rest } = parts();
    // If the content is still fading in, jump it to the end first
    panel.getAnimations({ subtree: true }).forEach((a) => a.finish());
    const outs = [...rest].reverse().map((el, i) =>
      el.animate(
        [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: 'translateY(12px)' },
        ],
        { duration: FADE_OUT, delay: i * STAGGER_OUT, easing: 'ease-in', fill: 'forwards' }
      )
    );
    await Promise.all([...outs.map(done), scrollToTop(FADE_OUT + rest.length * STAGGER_OUT)]);

    // 2. Background shrinks back to the card, heading shrinks back to its title
    const park = parkedBox(card, title);
    const start = card.getBoundingClientRect();
    g.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    g.style.transform = `translate(${park.left - start.left}px, ${park.top - start.top}px)`;
    g.style.boxShadow = '0 40px 80px -40px rgba(28, 26, 23, 0.35)';
    g.style.opacity = '';
    title.style.transformOrigin = '0 0';
    const titleShrink = title.animate(
      [{ transform: 'none' }, { transform: titleInvert(card, park, title) }],
      { duration: GROW, easing: EASE, fill: 'forwards' }
    );
    panel.getAnimations().forEach((a) => a.cancel());
    const shrink = panel.animate(
      [{ clipPath: FULL }, { clipPath: cardClip(card, park) }],
      { duration: GROW, easing: EASE, fill: 'forwards' }
    );
    g.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: GROW * 0.25,
      delay: GROW * 0.75,
      fill: 'both',
    });
    await Promise.all([done(titleShrink), done(shrink)]);

    // Hand back to the ghost card and hide the panel
    hideTitle(g, false);
    panel.hidden = true;
    panel.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    title.style.transformOrigin = '';
    document.documentElement.style.overflow = '';

    // 1. Card glides back to its place in the carousel
    const back = card.getBoundingClientRect();
    await done(
      g.animate(
        [
          {
            transform: `translate(${park.left - back.left}px, ${park.top - back.top}px)`,
            boxShadow: '0 40px 80px -40px rgba(28, 26, 23, 0.35)',
          },
          { transform: 'none', boxShadow: '0 0 0 0 rgba(28, 26, 23, 0)' },
        ],
        { duration: MOVE, easing: EASE_IN_OUT, fill: 'forwards' }
      )
    );

    card.style.visibility = '';
    g.remove();
    ghost = null;
    onClosed?.(card);
    card.focus({ preventScroll: true });
    activeCard = null;
    busy = false;
  }

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
