import { JsonRpcProvider,Ed25519Keypair, RawSigner, PublicKey } from '@mysten/sui.js';
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
* get Mnemonic, seed, keypair
* return : keypair
*/ 
async function getMnemonic() {
    const mnemonics = bip39.generateMnemonic();
    //const keypair = new Ed25519Keypair();
    console.log("mnemonics : " + mnemonics);

    const seed = bip39.mnemonicToSeed(mnemonics)
    .then((buffer) => {
        //seed 문구를 uint8array로 변환
        let a = new Uint8Array(buffer.toJSON().data.slice(0,32))
        console.log("convert to Uint8Array : " + a);

        //시드로 부터 keypari생성
        const keypair = Ed25519Keypair.fromSeed(a);
        console.log("keypair : " + keypair);
        console.log("keypair.getPublicKey : " + keypair.getPublicKey().toSuiAddress());

        //키페어에서 공개키 주소 조립
        const pubkey = "0x"+keypair.getPublicKey().toSuiAddress();
        console.log("pubkey : " + pubkey);

        return keypair;
    })
    .catch((e) => {
        console.log("Error : "+e);
    })
}

//getMnemonic();

// 위 소스코드로 발급받은 공개키 0x18ef8032392a821b3092b7f0e044cc05bb39bb8a
// 잔액 0.01sui

/*
* get object detail
* return : address(pubkey)
*/
async function getObject() {

    provider.getObject('0x18ef8032392a821b3092b7f0e044cc05bb39bb8a')
    .then((result) => {
        console.log("txn.status 1 : " + result.status);
        console.log("txn.details 2 : " + result.details);
    })
    
}

//getObject();


/*
*   send sui coin 
*/ 
async function sendToken() {

    ///////////////keypair 복구를 위한 코드//////////////실제 소스에서는 사용자의 keypair 불러올 것//////////////
    const mnemonics = "gentle embrace hard glance lake method draft fossil stick settle pear glove";
    const seed = bip39.mnemonicToSeed(mnemonics)
    .then((buffer) => {
        //seed 문구를 uint8array로 변환
        let a = new Uint8Array(buffer.toJSON().data.slice(0,32))
        console.log("convert to Uint8Array : " + a);

        //시드로 부터 keypari생성
        const keypair = Ed25519Keypair.fromSeed(a);
        console.log("keypair : " + keypair.getPublicKey());

        return keypair
    })
    .then((result)=>{
        console.log("result : " + result.getPublicKey());

        //singer 설정 (param : keypair, rpc)
        const signer = new RawSigner(result, provider);
        console.log("signer : " + signer);       
        
        return signer;
    })
    .then((_singer) => {
        console.log("_singer : " + _singer);     
        
        const txn = {
            //코인 객체 id
            suiObjectId: "0x33ef108d19289702a352a86b6f948d5e4b437500",
            gasBudget: 1000,
            //받는 사람 주소
            recipient: "0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5",
            amount: 5000000
        }

        _singer.transferSuiWithRequestType(txn)
        .then((result) => {
            console.log("result : "+result);

        });
    })
    .catch((error) => {
        console.log("error : "+error);

    });

}

sendToken();