import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://jamyangponsar.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight response for 1 day

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, subject, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`, // Use sender's name and email
    to: process.env.EMAIL_USER, // Your email
    subject: `Portfolio Contact Message: ${subject || 'No Subject'}`, // Include "Portfolio Contact Message:" prefix
    text: `
      You have received a new message from your portfolio contact form.
      
      Name: ${firstName} ${lastName}
      Email: ${email}
      Subject: ${subject || 'No Subject'}
    
      Message:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}
