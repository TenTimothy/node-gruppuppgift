import express from 'express';
import blockchainRouter from './routes/blockchainRoute.mjs';
import Blockchain from './models/Blockchain.mjs';

const app = express();
const PORT = 3001;

app.use(express.json());

const blockchain = Blockchain.loadBlockchain();
global.blockchain = blockchain;

app.use('/api/v1/blockchain', (req, res, next) => {
    console.log(`Received request for /api/v1/blockchain`);
    next();
}, blockchainRouter);

app.all('*', (req, res) => {
    console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
