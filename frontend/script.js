const backendURL = 'https://portfolio-backend-gold-chi.vercel.app';

// Fetching data from the backend
fetch(`${backendURL}/api/endpoint`)
  .then(response => response.json())
  .then(data => {
    console.log('Data from backend:', data);
  })
  .catch(error => console.error('Error:', error));


  
const navToggle = document.getElementById('nav-toggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');

// Toggle Sidebar
navToggle.addEventListener('click', () => {
sidebar.classList.toggle('open');
navToggle.classList.toggle('open');
navToggle.innerHTML = sidebar.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close Sidebar
closeBtn.addEventListener('click', () => {
sidebar.classList.remove('open');
navToggle.classList.remove('open');
navToggle.innerHTML = '<i class="fas fa-bars"></i>';
});
  