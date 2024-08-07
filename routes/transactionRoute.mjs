import { Router } from 'express';
import { addTransaction, minePendingTransactions } from '../controllers/transactionController.mjs';

const router = Router();

router.post('/', addTransaction);
router.post('/mine-transactions', minePendingTransactions);

export default router;
