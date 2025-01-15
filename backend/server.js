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

const corsOptions = {
    origin: 'https://jamyangponsar.vercel.app', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // Preflight request handling
  

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your Gmail address
      pass: process.env.EMAIL_PASS,  // Your Gmail App Password
    },
  });

// Email Sending Endpoint
app.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;
  
    // Define email options
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`, // Sender's email
      to: process.env.MAIL_USER, // Your Gmail
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
