import { JsonRpcProvider,Ed25519Keypair, RawSigner, PublicKey, Coin } from '@mysten/sui.js';
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

//sendToken();



/*
* check balance of coin
*/
async function getBalance() {


    console.log("STRAT SEARCHING BALANCE OF SUI");

    //공개키가 가지고 있는 Sui Ojbject 확인
    provider.getObjectsOwnedByAddress("0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5")
    .then((result) => {
        //result = 모든 수이 오브젝트
        console.log("result of objectId : "+result);
        // console.log("result of objectId : "+result.length);
        // console.log("result of objectId : "+result[0].objectId);
        // console.log("result of objectId : "+result[0].digest);
        // console.log("result of objectId : "+result[0].type);
        // console.log("result of objectId : "+result[0].version);
    
        return result
    })
    .then((objs) => {

        const sizeOfobj = objs.length; //가지고 있는 수이 오브젝트 갯수 
        const arr : number [] = [];

        //가지고 있는 수이 오브젝트 갯수 만큼 for loop
        for(let i=0; i<sizeOfobj; i++){
            //objectId로 오브젝트 데이터 내역 조회
            provider.getObject(objs[i].objectId)
            .then((returnObjectData) => {
                //오브젝트의 balance를 빼오기 위해 string으로 전환
                //console.log("returnObjectData : " + JSON.stringify(returnObjectData.details));
                const toJsonResutl = JSON.stringify(returnObjectData.details);

                //밸런스값만 뺴오기 위한 스플릿
                console.log("toJsonResutl : " + toJsonResutl.split(",")[3].split(":")[2]);
                const objectBalance =  toJsonResutl.split(",")[3].split(":")[2];

                //합산을 위한 형변환
                let sumOfbalance = parseFloat(objectBalance);

                //Number array에 밀어넣기 
                arr.push(sumOfbalance);

                //Number array 객체 값 합산
                const subTotal = arr.reduce((accumulator, current) => {
                    return accumulator + current;
                }, 0)

                console.log("subTotal : "+ subTotal);

                return subTotal;

            })
            .catch((error) => {
                console.log("when for loop, error : " + error);
            })
        }

    })
    .catch((error) => {
        console.log(" error : " + error);
    })
 
}


getBalance();