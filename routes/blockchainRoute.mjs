import { Router } from 'express';
import { getBlockchain, getBlockByIndex, validateBlockchain } from '../controllers/blockchainController.mjs';

const router = Router();

router.get('/', getBlockchain);
router.get('/validate', validateBlockchain);
router.get('/:index', getBlockByIndex);

export default router;
