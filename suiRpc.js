"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var sui_js_1 = require("@mysten/sui.js");
var bip39 = require("bip39");
/*
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
var provider = new sui_js_1.JsonRpcProvider('https://fullnode.devnet.sui.io');
/*
* sui devnet pubkey info : 0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5
*/
/*
* get transaction of sui address
* param : address(pubkey)
* return : transaction obj
*/
function getTransactionObj() {
    return __awaiter(this, void 0, void 0, function () {
        var resultObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider.getObjectsOwnedByAddress('0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5')];
                case 1:
                    resultObj = _a.sent();
                    console.log("Test result : " + resultObj[0].objectId);
                    return [2 /*return*/];
            }
        });
    });
}
//getTransactionObj();
/*
* get Mnemonic, seed, keypair
* return : keypair
*/
function getMnemonic() {
    return __awaiter(this, void 0, void 0, function () {
        var mnemonics, seed;
        return __generator(this, function (_a) {
            mnemonics = bip39.generateMnemonic();
            //const keypair = new Ed25519Keypair();
            console.log("mnemonics : " + mnemonics);
            seed = bip39.mnemonicToSeed(mnemonics)
                .then(function (buffer) {
                //seed 문구를 uint8array로 변환
                var a = new Uint8Array(buffer.toJSON().data.slice(0, 32));
                console.log("convert to Uint8Array : " + a);
                //시드로 부터 keypari생성
                var keypair = sui_js_1.Ed25519Keypair.fromSeed(a);
                console.log("keypair : " + keypair);
                console.log("keypair.getPublicKey : " + keypair.getPublicKey().toSuiAddress());
                //키페어에서 공개키 주소 조립
                var pubkey = "0x" + keypair.getPublicKey().toSuiAddress();
                console.log("pubkey : " + pubkey);
                return keypair;
            })["catch"](function (e) {
                console.log("Error : " + e);
            });
            return [2 /*return*/];
        });
    });
}
//getMnemonic();
// 위 소스코드로 발급받은 공개키 0x18ef8032392a821b3092b7f0e044cc05bb39bb8a
// 잔액 0.01sui
/*
* get object detail
* return : address(pubkey)
*/
function getObject() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            provider.getObject('0x18ef8032392a821b3092b7f0e044cc05bb39bb8a')
                .then(function (result) {
                console.log("txn.status 1 : " + result.status);
                console.log("txn.details 2 : " + result.details);
            });
            return [2 /*return*/];
        });
    });
}
//getObject();
/*
*   send sui coin
*/
function sendToken() {
    return __awaiter(this, void 0, void 0, function () {
        var mnemonics, seed;
        return __generator(this, function (_a) {
            mnemonics = "gentle embrace hard glance lake method draft fossil stick settle pear glove";
            seed = bip39.mnemonicToSeed(mnemonics)
                .then(function (buffer) {
                //seed 문구를 uint8array로 변환
                var a = new Uint8Array(buffer.toJSON().data.slice(0, 32));
                console.log("convert to Uint8Array : " + a);
                //시드로 부터 keypari생성
                var keypair = sui_js_1.Ed25519Keypair.fromSeed(a);
                console.log("keypair : " + keypair.getPublicKey());
                return keypair;
            })
                .then(function (result) {
                console.log("result : " + result.getPublicKey());
                //singer 설정 (param : keypair, rpc)
                var signer = new sui_js_1.RawSigner(result, provider);
                console.log("signer : " + signer);
                return signer;
            })
                .then(function (_singer) {
                console.log("_singer : " + _singer);
                var txn = {
                    //코인 객체 id
                    suiObjectId: "0x33ef108d19289702a352a86b6f948d5e4b437500",
                    gasBudget: 1000,
                    //받는 사람 주소
                    recipient: "0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5",
                    amount: 5000000
                };
                _singer.transferSuiWithRequestType(txn)
                    .then(function (result) {
                    console.log("result : " + result);
                });
            })["catch"](function (error) {
                console.log("error : " + error);
            });
            return [2 /*return*/];
        });
    });
}
//sendToken();
/*
* check balance of coin
*/
function getBalance() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("STRAT SEARCHING BALANCE OF SUI");
            //공개키가 가지고 있는 Sui Ojbject 확인
            provider.getObjectsOwnedByAddress("0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5")
                .then(function (result) {
                //result = 모든 수이 오브젝트
                console.log("result of objectId : " + result);
                // console.log("result of objectId : "+result.length);
                // console.log("result of objectId : "+result[0].objectId);
                // console.log("result of objectId : "+result[0].digest);
                // console.log("result of objectId : "+result[0].type);
                // console.log("result of objectId : "+result[0].version);
                return result;
            })
                .then(function (objs) {
                var sizeOfobj = objs.length; //가지고 있는 수이 오브젝트 갯수 
                var arr = [];
                //가지고 있는 수이 오브젝트 갯수 만큼 for loop
                for (var i = 0; i < sizeOfobj; i++) {
                    //objectId로 오브젝트 데이터 내역 조회
                    provider.getObject(objs[i].objectId)
                        .then(function (returnObjectData) {
                        //오브젝트의 balance를 빼오기 위해 string으로 전환
                        //console.log("returnObjectData : " + JSON.stringify(returnObjectData.details));
                        var toJsonResutl = JSON.stringify(returnObjectData.details);
                        //밸런스값만 뺴오기 위한 스플릿
                        console.log("toJsonResutl : " + toJsonResutl.split(",")[3].split(":")[2]);
                        var objectBalance = toJsonResutl.split(",")[3].split(":")[2];
                        var sumOfbalance = parseFloat(objectBalance);
                        arr.push(sumOfbalance);
                        var subTotal = arr.reduce(function (accumulator, current) {
                            return accumulator + current;
                        }, 0);
                        console.log("subTotal : " + subTotal);
                    })["catch"](function (error) {
                        console.log("when for loop, error : " + error);
                    });
                }
            })["catch"](function (error) {
                console.log(" error : " + error);
            });
            return [2 /*return*/];
        });
    });
}
getBalance();
