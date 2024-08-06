import { Router } from 'express';
import { addTransaction, minePendingTransactions } from '../controllers/transactionController.mjs';

const router = Router();

router.post('/', (req, res) => {
    console.log('POST request received at /api/v1/transactions');
    addTransaction(req, res);
});

router.post('/mine-transactions', (req, res) => {
    console.log('POST request received at /api/v1/transactions/mine-transactions');
    minePendingTransactions(req, res);
});

export default router;
