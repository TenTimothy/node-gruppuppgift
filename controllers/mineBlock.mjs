import Blockchain from '../models/Blockchain.mjs';

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
