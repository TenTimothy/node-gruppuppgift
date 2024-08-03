import { createHash } from '../utils/crypto-lib.mjs';
import Block from './Block.mjs';

export default class Blockchain {
    constructor(chain = []) {
        this.chain = chain.length ? chain : [this.createGenesisBlock()];
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
}
