import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as blockchainController from '../controllers/getBlockchain.mjs';
import Blockchain from '../models/Blockchain.mjs';

describe('Blockchain Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        next = vi.fn();

        
        global.blockchain = new Blockchain();
    });

    it('should return the blockchain', () => {
        blockchainController.getBlockchain(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: global.blockchain.getChain()
        });
    });
});
