import Blockchain from '../models/Blockchain.mjs';

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
