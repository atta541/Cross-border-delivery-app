const fs = require('fs');
app.post('/upload-verification-document', async (req, res) => {
    const { accountId, filePath } = req.body; // filePath is the path to the file to be uploaded
    try {
        // Upload the file to Stripe
        const file = await stripe.files.create({
            purpose: 'identity_document',
            file: {
                data: fs.readFileSync(filePath),
                name: 'document.jpg', // Adjust file name and extension as needed
                type: 'application/octet-stream'
            }
        });
        // Attach the file to the account for verification
        const updatedAccount = await stripe.accounts.update(accountId, {
            individual: {
                verification: {
                    document: {
                        front: file.id // Use file.id from the file upload response
                    }
                }
            }
        });
        res.json({
            message: 'Document uploaded and attached successfully.',
            status: updatedAccount.verification.status
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});














// const result = await stripe.createToken('bank_account', { country: 'GB', // Specify the country code of the bank account.currency: 'gbp', // Specify the currency.routing_number: sortCode, // Sort code for UK accounts.account_number: accountNumber, account_holder_name: accountHolderName, account_holder_type: 'individual' // or 'company' });}