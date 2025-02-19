const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8081;

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.post('/payments/add-payment-method', (req, res) => {
    const { paymentMethodId } = req.body;

    // Handle the payment method logic here
    if (paymentMethodId) {
        // Assuming successful operation
        res.json({ message: 'Payment method added successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid payment method ID.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
