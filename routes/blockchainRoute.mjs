import { Router } from 'express';
import { getBlockchain, mineBlock } from '../controllers/blockchainControllers.mjs';

const router = Router();

router.get('/', (req, res) => {
    console.log('GET request received at /api/v1/blockchain');
    getBlockchain(req, res);
});

// Lägg till en route för att hantera POST-begäran för mining
router.post('/mine', (req, res) => {
    console.log('POST request received at /api/v1/blockchain/mine');
    mineBlock(req, res);
});

export default router;
