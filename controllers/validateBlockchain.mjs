import Blockchain from '../models/Blockchain.mjs';

export const validateBlockchain = (req, res) => {
    console.log('Handling GET /api/v1/blockchain/validate');
    const isValid = global.blockchain.validateChain();
    res.status(200).json({
        success: true,
        valid: isValid
    });
};
