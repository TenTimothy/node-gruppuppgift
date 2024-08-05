import Blockchain from '../models/Blockchain.mjs';

export const validateBlockchain = (req, res) => {
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
