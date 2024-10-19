const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(express.json());

// Function to send invoice email
async function sendInvoiceEmail(email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gopimandepudi1603@gmail.com', // Your email address
            pass: '**********' // Your email password (or app-specific password)
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your Order Invoice',
        text: 'Thank you for your order!',
        html: '<h3>Thank you for your order!</h3>'
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Endpoint to send invoice email
app.post('/send-invoice', (req, res) => {
    const { email } = req.body;
    sendInvoiceEmail(email)
        .then(() => res.json({ success: true }))
        .catch(error => res.status(500).json({ success: false, error: error.message }));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
