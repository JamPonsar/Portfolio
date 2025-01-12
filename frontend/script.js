const backendURL = 'https://portfolio-backend-gold-chi.vercel.app';

// Fetching data from the backend
fetch(`${backendURL}/api/endpoint`)
  .then(response => response.json())
  .then(data => {
    console.log('Data from backend:', data);
  })
  .catch(error => console.error('Error:', error));

// Sidebar toggle functionality
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

// Toggle sidebar visibility
function toggleSidebar() {
  sidebar.classList.toggle('open');
}

toggleBtn.addEventListener('click', toggleSidebar);

// Ensure body styling updates with sidebar state
toggleBtn.addEventListener('click', function() {
  document.body.classList.toggle('sidebar-open');
});
