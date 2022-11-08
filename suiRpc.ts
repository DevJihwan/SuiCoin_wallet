import { JsonRpcProvider,Ed25519Keypair, RawSigner, PublicKey, Network } from '@mysten/sui.js';
import * as bip39 from 'bip39';
import * as nacl from 'tweetnacl';
import axios, {AxiosResponse} from 'axios';
import { ids } from 'webpack';

/* 
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
const provider = new JsonRpcProvider(Network.DEVNET);

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
            amount: 2000000
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


        //조회된 오브젝트의 값
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


//getBalance();


/*
* 현재 보유하고 있는 Sui 리스트 (각 오브젝트 별 오브젝트id, 타입{:수이}, 잔액, )
*/ 
async function getOwnSuiList(){

    console.log("STRAT SEARCHING History OF transaction");

    //결과를 리턴하기 위한 map 정의 (key : 오브젝트id, value {타입, 잔액})
    const map = new Map<string, string[]>();

    //공개키가 가지고 있는 Sui Ojbject 확인
    provider.getObjectsOwnedByAddress("0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5")
    .then((resultOfObjects) => {
        //보유하고 있는 오브젝트 갯수 파악
        const sizeOfobject = resultOfObjects.length;
        console.log("sizeOfobject : "+ sizeOfobject);


        //map에 오브젝트id와 type을 먼저 셋팅 
        for(let i=0; i<sizeOfobject; i++){
            console.log(`첫 번째 loop의 ${i}번째`);

            map.set(resultOfObjects[i].objectId,[resultOfObjects[i].type]);//key : objectId, value : sui type
        }

        //밸런스를 가져오기 위한 작업
        const sizeOfmap = map.size;
        let objectBalance;
        for(let i=0; i<sizeOfmap; i++){
            console.log(`두 번째 loop의 ${i}번째`);

            provider.getObject(resultOfObjects[i].objectId)
            .then((reseult) => {
                //잔액을 조회 
                const toJsonResutl = JSON.stringify(reseult.details);
                objectBalance =  toJsonResutl.split(",")[3].split(":")[2];
                console.log("objectBalance : "+objectBalance);

                //typescript에서 map은 set으로 값을 새로 지정해줌. 최근 값만 업데이트가 되기 때문에 기존 밸류값을 템프에 넣어두고 다시 셋에 사용함. 
                const tempValue = map.get(resultOfObjects[i].objectId);
                map.set(resultOfObjects[i].objectId, [tempValue,objectBalance]);                

                //map 구조 셋팅 확인용 
                console.log("check values : " + map.get('0x4fbc250ac48976a36898777fe94f2f5540f99e22'));
            });

        }
    })
    //end .then
    //key: objectId, value : type, balance
    return map;
}

//getOwnSuiList();


/*
* 거래 히스토리를 보여주는 방법 : 보유하고 있는 수이 코인 객체를 불러옴. 각 객체의 digest를 가져오고, digest로 transaction query를 날려서 송금인, 수신인 주소를 provider와 비교하여 구분
*/

async function getHistoryTranssaction() {

    console.log("Staring get transaction history");
    const pubkey = '0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5';

    //공개키로 모든 digest 내역 가져오기
    const resultOfdiget = await provider.getTransactionsForAddress(pubkey);
    // console.log("resultOfdiget : "+resultOfdiget);
    console.log("resultOfdiget : "+resultOfdiget.length);


    // 이 데이터로 원하는 데이터 뽑아냄 {return : flag: sent or receiver, recipients : 받은 사람, amount : 받은 돋, gas: 수수료}
    // flag는 recipents의 주소가 입력한 공개키와 일치하면 받은 돈, 불일치하면 보낸 돈으로 판단 

    let _flag, _recipients, _amount, _gas;
    const map = new Map<number, string[]>();

    for (let i=0; i<resultOfdiget.length; i++){
        //digest로 transaction 디테일 불러오기
        const history = await provider.getTransactionWithEffects(resultOfdiget[i]);
        console.log(`${i}번째 digest : ${resultOfdiget[i]}`);

        //불러온 내역 중에서 transactions만 빼오기
        const selector = history.certificate.data.transactions;
        // console.log("selector : " + JSON.stringify(selector));


        //PaySui가 여러개 토큰을 발행해주는 메소드로 판단되어 분기 처리 
        const methodName = JSON.stringify(selector).split("\"")[1];
        console.log("methodName : "+ methodName);

        //json data 대괄호를 없애기 위한 작업
        const a = JSON.stringify(selector[0]);
        // console.log("a : " + a);

        _gas = history.effects.events[0].coinBalanceChange.amount;
        // console.log("_gas : "+_gas);

        const data = JSON.parse(a);

        if(methodName == "PaySui"){
            // console.log("data.Paysui.amounts : "+ data.PaySui.amounts);

            //amount가 리스트로 내려오면 내려온 값 합산
            if(1<data.PaySui.amounts.length){
                
                const subtotal = data.PaySui.amounts.reduce((accumulator, current) => {
                    return accumulator + current;
                }, 0)
                
                // console.log("subtotal : "+subtotal);
                _amount = subtotal;
            }else{
                _amount = data.PaySui.amounts;
            }

            // console.log("data.Paysui.recipients : "+data.PaySui.recipients);

            //recipients가 복수로 내려오는 경우 확인 (테스트 토큰 지급시 수령인 5개가 모두 동일 주소로 내려옴)
            if(1<data.PaySui.recipients.length){
                _recipients = data.PaySui.recipients[0];
            }else{
                _recipients = data.PaySui.recipients;
            }

            //수령인과 공개키를 비교하여 플래그 결정 
            if(pubkey == _recipients){
                _flag = "Received"
            }else{
                _flag = "Sent"
            }

        }else if (methodName == "Pay"){
            // console.log("data.Pay.amounts : "+data.Pay.amounts);
            _amount = data.Pay.amounts;

            // console.log("data.Pay.recipients : "+data.Pay.recipients);
            _recipients = data.Pay.recipients;

            //수령인과 공개키를 비교하여 플래그 결정 
            if(pubkey == _recipients){
                _flag = "Received"
            }else{
                _flag = "Sent"
            }
        }
        console.log(`_flag : ${_flag}, _recipients : ${_recipients}, _amount : ${_amount}, _gas : ${_gas}`);
        map.set(i, [_flag, _recipients, _amount, _gas]);

    }
    
    
    return map;
    
}

//getHistoryTranssaction();





/*
*  requets sui test token
*/ 
async function getRequestTestToken(){

    console.log("Staring get Request Test Token");

    const _provider = new JsonRpcProvider(Network.DEVNET, {
        faucetURL: 'https://faucet.devnet.sui.io',
      });

    //프론트에서 넘겨받을 예정 
    const _pubkey = "0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5";

    const response = await _provider.requestSuiFromFaucet(_pubkey);

    console.log(response);
    

}

// getRequestTestToken();



/*
* 계좌 검증 
*/

async function isSuiAddress(){

    const pubkey = '0x18ef8032392a821b3092b7f0e044cc05bb39bb8a';
    const SUI_ADDRESS_LENGTH = 20;
    
    const checkReg1 = /^(0x|0X)?[a-fA-F0-9]+$/.test(pubkey) && pubkey.length % 2 === 0;
    const checkReg2 = /^(0x|0X)/.test(pubkey) ? (pubkey.length - 2) / 2 : pubkey.length / 2;
    const checkReg3 = SUI_ADDRESS_LENGTH

    console.log(`checkReg1 : ${checkReg1}, checkReg2 : ${checkReg2}, checkReg3 : ${checkReg3}`);
    console.log(checkReg1 && checkReg2 === checkReg3);
    return (checkReg1 && checkReg2 === checkReg3)
}

isSuiAddress();