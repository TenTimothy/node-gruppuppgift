import { Router } from 'express';
import { getBlockchain } from '../controllers/getBlockchain.mjs';
import { mineBlock } from '../controllers/blockchainControllers.mjs';
import { getBlockByIndex } from '../controllers/blockchainControllers.mjs';
import { validateBlockchain } from '../controllers/blockchainControllers.mjs';
import { addTransaction } from '../controllers/blockchainControllers.mjs';
import { minePendingTransactions } from '../controllers/blockchainControllers.mjs';

const router = Router();

router.get('/', (req, res) => {
    console.log('GET request received at /api/v1/blockchain');
    getBlockchain(req, res);
});

router.post('/mine', (req, res) => {
    console.log('POST request received at /api/v1/blockchain/mine');
    mineBlock(req, res);
});

router.get('/:index', (req, res) => {
    console.log('GET request received at /api/v1/blockchain/:index');
    getBlockByIndex(req, res);
});

router.get('/validate', (req, res) => {
    console.log('GET request received at /api/v1/blockchain/validate');
    validateBlockchain(req, res);
});

router.post('/transactions', (req, res) => {
    console.log('POST request received at /api/v1/blockchain/transactions');
    addTransaction(req, res);
});

router.post('/mine-transactions', (req, res) => {
    console.log('POST request received at /api/v1/blockchain/mine-transactions');
    minePendingTransactions(req, res);
});

export default router;
