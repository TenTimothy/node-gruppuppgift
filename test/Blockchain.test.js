import { describe, it, expect, beforeEach } from 'vitest';
import Blockchain from '../models/Blockchain.mjs';
import Block from '../models/Block.mjs';

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('should create a genesis block', () => {
        const genesisBlock = blockchain.getChain()[0];
        expect(genesisBlock).toBeInstanceOf(Block);
        expect(genesisBlock.blockIndex).toBe(0);
        expect(genesisBlock.previousBlockHash).toBe('0');
    });

    it('should add a new block', () => {
        const data = { amount: 4 };
        blockchain.addBlock(data);
        const lastBlock = blockchain.getLastBlock();
        expect(lastBlock.data).toEqual(data);
        expect(lastBlock.blockIndex).toBe(2);
    });

    it('should validate the blockchain', () => {
        const data = { amount: 4 };
        blockchain.addBlock(data);
        expect(blockchain.validateChain()).toBe(true);
    });
});
