import express from 'express';
import blockchainRouter from './routes/blockchainRoute.mjs';
import transactionRouter from './routes/transactionRoute.mjs'; 
import Blockchain from './models/Blockchain.mjs';
import { errorHandler } from './middlewares/errorHandler.mjs';

const app = express();
const PORT = 3001;

app.use(express.json());

const blockchain = Blockchain.loadBlockchain();
global.blockchain = blockchain;

app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/transactions', transactionRouter);

app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
