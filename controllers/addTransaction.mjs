import Blockchain from '../models/Blockchain.mjs';

export const minePendingTransactions = (req, res) => {
    console.log('Handling POST /api/v1/blockchain/mine-transactions');
    const newBlock = global.blockchain.minePendingTransactions();

    res.status(201).json({
        success: true,
        data: newBlock
    });
};
