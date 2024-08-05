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
