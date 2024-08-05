import Blockchain from '../models/Blockchain.mjs';

export const getBlockchain = (req, res) => {
    console.log('Handling GET /api/v1/blockchain');
    res.status(200).json({
        success: true,
        data: global.blockchain.getChain()
    });
};
