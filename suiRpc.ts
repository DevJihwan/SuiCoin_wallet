import { JsonRpcProvider,Ed25519Keypair, RawSigner } from '@mysten/sui.js';
import * as bip39 from 'bip39';
import * as nacl from 'tweetnacl';

/* 
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
const provider = new JsonRpcProvider('https://fullnode.devnet.sui.io');

/* 
* sui devnet pubkey info : 0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5
*/ 

/* 
* get transaction of sui address 
* param : address(pubkey)
* return : transaction obj
*/ 
async function getTransactionObj() {
    const resultObj = await provider.getObjectsOwnedByAddress('0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5');
    console.log("Test result : " + resultObj[0].objectId);
    //console.log("Test result : " + resultObj[0].objectId);
    //console.log("Test result : " + resultObj[0].objectId);
}

//getTransactionObj();

/* 
* get Mnemonic word
* param : 
* return : 
*/ 
async function getMnemonic() {
    const mnemonics = bip39.generateMnemonic();
    //const keypair = new Ed25519Keypair();
    console.log("mnemonics : " + mnemonics);

    const seed = await bip39.mnemonicToSeed(mnemonics);
    console.log("seed : " + seed);

    const keypair = Ed25519Keypair.fromSeed(seed);
    console.log("keypair : " + keypair);

}

getMnemonic();
