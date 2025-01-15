const backendURL = 'https://portfolio-backend-gold-chi.vercel.app';

// Fetching data from the backend
fetch(`${backendURL}/api/endpoint`)
  .then(response => response.json())
  .then(data => {
    console.log('Data from backend:', data);
  })
  .catch(error => console.error('Error:', error));




// Elements
const navToggle = document.getElementById('nav-toggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const sidebarLinks = document.querySelector('.sidebar-links');

// Toggle Sidebar
navToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  navToggle.classList.toggle('open');
  navToggle.innerHTML = sidebar.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
//   sidebarLinks.style.pointerEvents = sidebar.classList.contains('open') ? 'auto' : 'none';
});

// Close Sidebar
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
}

// Wait for the DOM to load
window.addEventListener('DOMContentLoaded', () => {
  const mainText = document.getElementById('main-text');

  // Add the 'visible' class to trigger the animation
  setTimeout(() => {
    if (mainText) {
      mainText.classList.add('visible');
    }
  }, 200);
});

// Add functionality to Contact Button
const contactButton = document.getElementById('contact-button');
if (contactButton) {
  contactButton.addEventListener('click', () => {
    window.location.href = 'contact.html';
    contactButton.style.backgroundColor = '#b43bb9';
  });
}



// Handle form submission
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload
  
  // Collect form data
  const formData = {
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value || 'No Subject',
    message: document.getElementById('message').value,
  };

  // Send data to backend
  try {
    const response = await fetch(`${backendURL}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Email sent successfully!');
      form.reset(); // Clear the form
    } else {
      alert('Failed to send email. Please try again.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    alert('An error occurred. Please try again later.');
  }
});