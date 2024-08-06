import { Router } from 'express';
import { getBlockchain, getBlockByIndex, validateBlockchain } from '../controllers/blockchainController.mjs';

const router = Router();

router.get('/', (req, res) => {
    console.log('GET request received at /api/v1/blockchain');
    getBlockchain(req, res);
});

router.get('/validate', (req, res) => {
    console.log('GET request received at /api/v1/blockchain/validate');
    validateBlockchain(req, res);
});

router.get('/:index', (req, res) => {
    console.log('GET request received at /api/v1/blockchain/:index');
    getBlockByIndex(req, res);
});

export default router;
