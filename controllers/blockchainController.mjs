import Blockchain from '../models/Blockchain.mjs';

export const getBlockchain = (req, res, next) => {
    console.log('Handling GET /api/v1/blockchain');
    try {
        res.status(200).json({
            success: true,
            data: global.blockchain.getChain()
        });
    } catch (error) {
        return next(error);
    }
};

export const getBlockByIndex = (req, res, next) => {
    console.log('Handling GET /api/v1/blockchain/:index');
    const { index } = req.params;
    const blockIndex = parseInt(index, 10);

    if (isNaN(blockIndex) || blockIndex < 0 || blockIndex >= global.blockchain.getChain().length) {
        const error = new Error('Invalid block index');
        res.status(400).json({
            success: false,
            message: error.message
        });
        return next(error);
    }

    const block = global.blockchain.getChain()[blockIndex];

    res.status(200).json({
        success: true,
        data: block
    });
};

export const mineBlock = (req, res, next) => {
    console.log('Handling POST /api/v1/blockchain/mine');
    const { data } = req.body;

    if (!data) {
        const error = new Error('Data is required to create a new block');
        res.status(400).json({
            success: false,
            message: error.message
        });
        return next(error);
    }

    try {
        const newBlock = global.blockchain.addBlock(data);
        res.status(201).json({
            success: true,
            data: newBlock
        });
    } catch (error) {
        return next(error);
    }
};

export const validateBlockchain = (req, res, next) => {
    console.log('Handling GET /api/v1/blockchain/validate');
    const isValid = global.blockchain.validateChain();
    if (isValid) {
        res.status(200).json({
            success: true,
            valid: isValid
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Blockchain is invalid'
        });
    }
};
