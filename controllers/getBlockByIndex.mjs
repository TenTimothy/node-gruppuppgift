import Blockchain from '../models/Blockchain.mjs';

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
