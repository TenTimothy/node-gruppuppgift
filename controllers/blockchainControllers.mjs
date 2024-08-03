import Blockchain from '../models/Blockchain.mjs';

const blockchain = new Blockchain();

export const getBlockchain = (req, res) => {
    console.log('Handling GET /api/v1/blockchain');
    res.status(200).json({
        success: true,
        data: blockchain.getChain()
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

    const newBlock = blockchain.addBlock(data);

    res.status(201).json({
        success: true,
        data: newBlock
    });
};
