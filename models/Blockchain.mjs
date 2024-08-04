import { createHash } from '../utils/crypto-lib.mjs';
import Block from './Block.mjs';
import Transaction from './Transaction.mjs';

export default class Blockchain {
    constructor(chain = []) {
        this.chain = chain.length ? chain : [this.createGenesisBlock()];
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        return new Block(Date.now(), 0, '0', createHash('Genesis Block'), 'Genesis Block');
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const previousBlock = this.getLastBlock();
        const newBlockIndex = previousBlock.blockIndex + 1;
        const newBlockTimestamp = Date.now();
        const newBlockHash = createHash(newBlockTimestamp + previousBlock.currentBlockHash + JSON.stringify(data));
        const newBlock = new Block(newBlockTimestamp, newBlockIndex, previousBlock.currentBlockHash, newBlockHash, data);
        this.chain.push(newBlock);
        return newBlock;
    }

    getChain() {
        return this.chain;
    }

    addTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions() {
        const previousBlock = this.getLastBlock();
        const newBlockIndex = previousBlock.blockIndex + 1;
        const newBlockTimestamp = Date.now();
        const newBlockHash = createHash(newBlockTimestamp + previousBlock.currentBlockHash + JSON.stringify(this.pendingTransactions));
        const newBlock = new Block(newBlockTimestamp, newBlockIndex, previousBlock.currentBlockHash, newBlockHash, this.pendingTransactions);
        this.chain.push(newBlock);
        this.pendingTransactions = [];
        return newBlock;
    }

    validateBlock(block, previousBlock) {
        if (previousBlock.blockIndex + 1 !== block.blockIndex) return false;
        if (block.previousBlockHash !== previousBlock.currentBlockHash) return false;
        if (createHash(block.timestamp + block.previousBlockHash + JSON.stringify(block.data)) !== block.currentBlockHash) return false;
        return true;
    }

    validateChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (!this.validateBlock(currentBlock, previousBlock)) {
                return false;
            }
        }
        return true;
    }
}
