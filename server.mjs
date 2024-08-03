import express from 'express';
import blockchainRouter from './routes/blockchainRoute.mjs';

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/api/v1/blockchain', (req, res, next) => {
    console.log('Received request for /api/v1/blockchain');
    next();
}, blockchainRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
