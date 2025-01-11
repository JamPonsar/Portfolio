const backendURL = 'https://portfolio-backend-gold-chi.vercel.app';

// Example API request
fetch(`${backendURL}/api/endpoint`)
  .then(response => response.json())
  .then(data => {
    console.log('Data from backend:', data);
  })
  .catch(error => console.error('Error:', error));
