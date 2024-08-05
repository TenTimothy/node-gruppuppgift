import { createHash } from '../utils/crypto-lib.mjs';
import Block from './Block.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOCKCHAIN_FILE = path.join(__dirname, '../data/blockchainLogs/blockchain.json');

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
        this.saveBlockchain();
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
        this.saveBlockchain();
        return newBlock;
    }

    validateBlock(block, previousBlock) {
        console.log('Validating block:', block);
        console.log('Previous block:', previousBlock);

        if (previousBlock.blockIndex + 1 !== block.blockIndex) {
            console.log('Invalid block index:', block.blockIndex);
            return false;
        }
        if (block.previousBlockHash !== previousBlock.currentBlockHash) {
            console.log('Invalid previous block hash:', block.previousBlockHash);
            return false;
        }
        const recalculatedHash = createHash(block.timestamp + block.previousBlockHash + JSON.stringify(block.data));
        if (recalculatedHash !== block.currentBlockHash) {
            console.log('Invalid block hash:', recalculatedHash);
            return false;
        }
        return true;
    }

    validateChain() {
        console.log('Starting blockchain validation');
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            console.log(`Validating block ${i} with previous block ${i - 1}`);
            if (!this.validateBlock(currentBlock, previousBlock)) {
                console.log(`Block ${i} is invalid`);
                return false;
            }
        }
        console.log('Blockchain is valid');
        return true;
    }

    saveBlockchain() {
        const dir = path.dirname(BLOCKCHAIN_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(BLOCKCHAIN_FILE, JSON.stringify(this.chain, null, 4));
    }

    static loadBlockchain() {
        if (fs.existsSync(BLOCKCHAIN_FILE)) {
            const chain = JSON.parse(fs.readFileSync(BLOCKCHAIN_FILE, 'utf8'));
            return new Blockchain(chain);
        }
        return new Blockchain();
    }
}
