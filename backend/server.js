const express = require('express');
const cors = require('cors');
const path = require('path');

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://jamyangponsar.vercel.app',
}));
app.options('*', cors()); // Allow preflight requests for all routes

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// // Example API endpoint
// app.get('/api/endpoint', (req, res) => {
//   res.json({ message: 'Hello from the backend!' });
// });



// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your Gmail address
      pass: process.env.EMAIL_PASS,  // Your Gmail App Password
    },
  });
  
//   // API endpoint to send email
//   app.post('/send-email', (req, res) => {
//     const { firstName, lastName, email, subject, message } = req.body;
  
//     const mailOptions = {
//       from: email,
//       to: process.env.EMAIL_USER,
//       subject: `New Contact Form Submission: ${subject}`,
//       text: `You have a new message from:
//             Name: ${firstName} ${lastName}
//             Email: ${email}
//             Message: ${message}`,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Failed to send email' });
//       }
//       res.status(200).json({ message: 'Email sent successfully!' });
//     });
//   });


// Email Sending Endpoint
app.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;
  
    // Define email options
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`, // Sender's email
      to: process.env.GMAIL_USER, // Your Gmail
      subject: subject,
      text: message,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ message: 'Failed to send email.' });
    }
  });
  


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
