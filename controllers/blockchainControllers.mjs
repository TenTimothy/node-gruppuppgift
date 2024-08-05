import Blockchain from '../models/Blockchain.mjs';
import Transaction from '../models/Transaction.mjs';

export const getBlockchain = (req, res) => {
    console.log('Handling GET /api/v1/blockchain');
    res.status(200).json({
        success: true,
        data: global.blockchain.getChain()
    });
};

export const mineBlock = (req, res) => {
    console.log('Handling POST /api/v1/blockchain/mine');
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: 'Data is required to create a new block'
        });
    }

    const newBlock = global.blockchain.addBlock(data);

    res.status(201).json({
        success: true,
        data: newBlock
    });
};

export const getBlockByIndex = (req, res) => {
    console.log('Handling GET /api/v1/blockchain/:index');
    const { index } = req.params;
    const blockIndex = parseInt(index, 10);

    if (isNaN(blockIndex) || blockIndex < 0 || blockIndex >= global.blockchain.getChain().length) {
        return res.status(400).json({
            success: false,
            message: 'Invalid block index'
        });
    }

    const block = global.blockchain.getChain()[blockIndex];

    res.status(200).json({
        success: true,
        data: block
    });
};

export const validateBlockchain = (req, res) => {
    console.log('Handling GET /api/v1/blockchain/validate');
    const isValid = global.blockchain.validateChain();
    res.status(200).json({
        success: true,
        valid: isValid
    });
};

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

export const minePendingTransactions = (req, res) => {
    console.log('Handling POST /api/v1/blockchain/mine-transactions');
    const newBlock = global.blockchain.minePendingTransactions();

    res.status(201).json({
        success: true,
        data: newBlock
    });
};
