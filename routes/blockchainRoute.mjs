import { Router } from 'express';
import { getBlockchain } from '../controllers/blockchainControllers.mjs';

const router = Router();
router.get('/', (req, res) => {
    console.log('GET request received at /api/v1/blockchain');
    getBlockchain(req, res);
});

export default router;
