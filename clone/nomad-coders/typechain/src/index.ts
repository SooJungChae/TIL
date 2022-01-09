import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  // static 를 써야 new Block 을 안하더라도 Block.calculateBlockHash 접근이 가능하다.
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string => CryptoJS.SHA256(index + previousHash + data + timestamp);

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "20202020202020", "", "Hello", 12345);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const latestBlock: Block = getLatestBlock();
  const newIndex: number = latestBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    latestBlock.previousHash,
    data,
    newTimestamp
  );
  const newBlock = new Block(
    newIndex,
    newHash,
    latestBlock.hash,
    data,
    newTimestamp
  );
  return newBlock;
};

// console.log(blockchain);

console.log(createNewBlock("first block"));
console.log(createNewBlock("second block"));

export {};
