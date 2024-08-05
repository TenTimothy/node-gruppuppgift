import Transaction from '../models/Transaction.mjs';

export const addTransaction = (req, res, next) => {
    console.log('Handling POST /api/v1/blockchain/transactions');
    const { sender, recipient, amount } = req.body;

    if (!sender || !recipient || !amount) {
        const error = new Error('Sender, recipient, and amount are required to create a new transaction');
        res.status(400).json({
            success: false,
            message: error.message
        });
        return next(error);
    }

    const transaction = new Transaction(sender, recipient, amount);
    global.blockchain.addTransaction(transaction);

    res.status(201).json({
        success: true,
        data: transaction
    });
};
