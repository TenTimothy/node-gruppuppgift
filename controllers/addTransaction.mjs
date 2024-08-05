import Transaction from '../models/Transaction.mjs';

export const addTransaction = (req, res) => {
    console.log('Handling POST /api/v1/blockchain/transactions');
    const { sender, recipient, amount } = req.body;

    if (!sender || !recipient || !amount) {
        return res.status(400).json({
            success: false,
            message: 'Sender, recipient, and amount are required to create a new transaction'
        });
    }

    const transaction = new Transaction(sender, recipient, amount);
    global.blockchain.addTransaction(transaction);

    res.status(201).json({
        success: true,
        data: transaction
    });
};
