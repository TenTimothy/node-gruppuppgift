import Blockchain from '../models/Blockchain.mjs';

export const minePendingTransactions = (req, res, next) => {
    console.log('Handling POST /api/v1/blockchain/mine-transactions');
    try {
        const newBlock = global.blockchain.minePendingTransactions();
        res.status(201).json({
            success: true,
            data: newBlock
        });
    } catch (error) {
        return next(error);
    }
};
