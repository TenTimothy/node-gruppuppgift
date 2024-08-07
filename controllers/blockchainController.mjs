import Blockchain from '../models/Blockchain.mjs';

export const getBlockchain = (req, res, next) => {
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

export const validateBlockchain = (req, res, next) => {
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
