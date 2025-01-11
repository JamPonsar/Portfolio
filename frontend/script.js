const backendURL = 'https://portfolio-backend-gold-chi.vercel.app';

fetch(`${backendURL}/api/endpoint`)
  .then(response => response.json())
  .then(data => {
    console.log('Data from backend:', data);
  })
  .catch(error => console.error('Error:', error));
