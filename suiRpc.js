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
var provider = new sui_js_1.JsonRpcProvider(sui_js_1.Network.DEVNET);
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
                //seed ????????? uint8array??? ??????
                var a = new Uint8Array(buffer.toJSON().data.slice(0, 32));
                console.log("convert to Uint8Array : " + a);
                //????????? ?????? keypari??????
                var keypair = sui_js_1.Ed25519Keypair.fromSeed(a);
                console.log("keypair : " + keypair);
                console.log("keypair.getPublicKey : " + keypair.getPublicKey().toSuiAddress());
                //??????????????? ????????? ?????? ??????
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
// ??? ??????????????? ???????????? ????????? 0x18ef8032392a821b3092b7f0e044cc05bb39bb8a
// ?????? 0.01sui
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
                //seed ????????? uint8array??? ??????
                var a = new Uint8Array(buffer.toJSON().data.slice(0, 32));
                console.log("convert to Uint8Array : " + a);
                //????????? ?????? keypari??????
                var keypair = sui_js_1.Ed25519Keypair.fromSeed(a);
                console.log("keypair : " + keypair.getPublicKey());
                return keypair;
            })
                .then(function (result) {
                console.log("result : " + result.getPublicKey());
                //singer ?????? (param : keypair, rpc)
                var signer = new sui_js_1.RawSigner(result, provider);
                console.log("signer : " + signer);
                return signer;
            })
                .then(function (_singer) {
                console.log("_singer : " + _singer);
                var txn = {
                    //?????? ?????? id
                    suiObjectId: "0x33ef108d19289702a352a86b6f948d5e4b437500",
                    gasBudget: 1000,
                    //?????? ?????? ??????
                    recipient: "0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5",
                    amount: 2000000
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
            //???????????? ????????? ?????? Sui Ojbject ??????
            provider.getObjectsOwnedByAddress("0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5")
                .then(function (result) {
                //result = ?????? ?????? ????????????
                console.log("result of objectId : " + result);
                //????????? ??????????????? ???
                // console.log("result of objectId : "+result.length);
                // console.log("result of objectId : "+result[0].objectId);
                // console.log("result of objectId : "+result[0].digest);
                // console.log("result of objectId : "+result[0].type);
                // console.log("result of objectId : "+result[0].version);
                return result;
            })
                .then(function (objs) {
                var sizeOfobj = objs.length; //????????? ?????? ?????? ???????????? ?????? 
                var arr = [];
                //????????? ?????? ?????? ???????????? ?????? ?????? for loop
                for (var i = 0; i < sizeOfobj; i++) {
                    //objectId??? ???????????? ????????? ?????? ??????
                    provider.getObject(objs[i].objectId)
                        .then(function (returnObjectData) {
                        //??????????????? balance??? ????????? ?????? string?????? ??????
                        //console.log("returnObjectData : " + JSON.stringify(returnObjectData.details));
                        var toJsonResutl = JSON.stringify(returnObjectData.details);
                        //??????????????? ????????? ?????? ?????????
                        console.log("toJsonResutl : " + toJsonResutl.split(",")[3].split(":")[2]);
                        var objectBalance = toJsonResutl.split(",")[3].split(":")[2];
                        //????????? ?????? ?????????
                        var sumOfbalance = parseFloat(objectBalance);
                        //Number array??? ???????????? 
                        arr.push(sumOfbalance);
                        //Number array ?????? ??? ??????
                        var subTotal = arr.reduce(function (accumulator, current) {
                            return accumulator + current;
                        }, 0);
                        console.log("subTotal : " + subTotal);
                        return subTotal;
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
//getBalance();
/*
* ?????? ???????????? ?????? Sui ????????? (??? ???????????? ??? ????????????id, ??????{:??????}, ??????, )
*/
function getOwnSuiList() {
    return __awaiter(this, void 0, void 0, function () {
        var map;
        return __generator(this, function (_a) {
            console.log("STRAT SEARCHING History OF transaction");
            map = new Map();
            //???????????? ????????? ?????? Sui Ojbject ??????
            provider.getObjectsOwnedByAddress("0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5")
                .then(function (resultOfObjects) {
                //???????????? ?????? ???????????? ?????? ??????
                var sizeOfobject = resultOfObjects.length;
                console.log("sizeOfobject : " + sizeOfobject);
                //map??? ????????????id??? type??? ?????? ?????? 
                for (var i = 0; i < sizeOfobject; i++) {
                    console.log("\uCCAB \uBC88\uC9F8 loop\uC758 ".concat(i, "\uBC88\uC9F8"));
                    map.set(resultOfObjects[i].objectId, [resultOfObjects[i].type]); //key : objectId, value : sui type
                }
                //???????????? ???????????? ?????? ??????
                var sizeOfmap = map.size;
                var objectBalance;
                var _loop_1 = function (i) {
                    console.log("\uB450 \uBC88\uC9F8 loop\uC758 ".concat(i, "\uBC88\uC9F8"));
                    provider.getObject(resultOfObjects[i].objectId)
                        .then(function (reseult) {
                        //????????? ?????? 
                        var toJsonResutl = JSON.stringify(reseult.details);
                        objectBalance = toJsonResutl.split(",")[3].split(":")[2];
                        console.log("objectBalance : " + objectBalance);
                        //typescript?????? map??? set?????? ?????? ?????? ????????????. ?????? ?????? ??????????????? ?????? ????????? ?????? ???????????? ????????? ???????????? ?????? ?????? ?????????. 
                        var tempValue = map.get(resultOfObjects[i].objectId);
                        map.set(resultOfObjects[i].objectId, [tempValue, objectBalance]);
                        //map ?????? ?????? ????????? 
                        console.log("check values : " + map.get('0x4fbc250ac48976a36898777fe94f2f5540f99e22'));
                    });
                };
                for (var i = 0; i < sizeOfmap; i++) {
                    _loop_1(i);
                }
            });
            //end .then
            //key: objectId, value : type, balance
            return [2 /*return*/, map];
        });
    });
}
//getOwnSuiList();
/*
* ?????? ??????????????? ???????????? ?????? : ???????????? ?????? ?????? ?????? ????????? ?????????. ??? ????????? digest??? ????????????, digest??? transaction query??? ????????? ?????????, ????????? ????????? provider??? ???????????? ??????
*/
function getHistoryTranssaction() {
    return __awaiter(this, void 0, void 0, function () {
        var pubkey, resultOfdiget, _flag, _recipients, _amount, _gas, map, i, history_1, selector, methodName, a, data, subtotal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Staring get transaction history");
                    pubkey = '0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5';
                    return [4 /*yield*/, provider.getTransactionsForAddress(pubkey)];
                case 1:
                    resultOfdiget = _a.sent();
                    // console.log("resultOfdiget : "+resultOfdiget);
                    console.log("resultOfdiget : " + resultOfdiget.length);
                    map = new Map();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < resultOfdiget.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, provider.getTransactionWithEffects(resultOfdiget[i])];
                case 3:
                    history_1 = _a.sent();
                    console.log("".concat(i, "\uBC88\uC9F8 digest : ").concat(resultOfdiget[i]));
                    selector = history_1.certificate.data.transactions;
                    methodName = JSON.stringify(selector).split("\"")[1];
                    console.log("methodName : " + methodName);
                    a = JSON.stringify(selector[0]);
                    // console.log("a : " + a);
                    _gas = history_1.effects.events[0].coinBalanceChange.amount;
                    data = JSON.parse(a);
                    if (methodName == "PaySui") {
                        // console.log("data.Paysui.amounts : "+ data.PaySui.amounts);
                        //amount??? ???????????? ???????????? ????????? ??? ??????
                        if (1 < data.PaySui.amounts.length) {
                            subtotal = data.PaySui.amounts.reduce(function (accumulator, current) {
                                return accumulator + current;
                            }, 0);
                            // console.log("subtotal : "+subtotal);
                            _amount = subtotal;
                        }
                        else {
                            _amount = data.PaySui.amounts;
                        }
                        // console.log("data.Paysui.recipients : "+data.PaySui.recipients);
                        //recipients??? ????????? ???????????? ?????? ?????? (????????? ?????? ????????? ????????? 5?????? ?????? ?????? ????????? ?????????)
                        if (1 < data.PaySui.recipients.length) {
                            _recipients = data.PaySui.recipients[0];
                        }
                        else {
                            _recipients = data.PaySui.recipients;
                        }
                        //???????????? ???????????? ???????????? ????????? ?????? 
                        if (pubkey == _recipients) {
                            _flag = "Received";
                        }
                        else {
                            _flag = "Sent";
                        }
                    }
                    else if (methodName == "Pay") {
                        // console.log("data.Pay.amounts : "+data.Pay.amounts);
                        _amount = data.Pay.amounts;
                        // console.log("data.Pay.recipients : "+data.Pay.recipients);
                        _recipients = data.Pay.recipients;
                        //???????????? ???????????? ???????????? ????????? ?????? 
                        if (pubkey == _recipients) {
                            _flag = "Received";
                        }
                        else {
                            _flag = "Sent";
                        }
                    }
                    console.log("_flag : ".concat(_flag, ", _recipients : ").concat(_recipients, ", _amount : ").concat(_amount, ", _gas : ").concat(_gas));
                    map.set(i, [_flag, _recipients, _amount, _gas]);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, map];
            }
        });
    });
}
//getHistoryTranssaction();
/*
*  requets sui test token
*/
function getRequestTestToken() {
    return __awaiter(this, void 0, void 0, function () {
        var _provider, _pubkey, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Staring get Request Test Token");
                    _provider = new sui_js_1.JsonRpcProvider(sui_js_1.Network.DEVNET, {
                        faucetURL: 'https://faucet.devnet.sui.io'
                    });
                    _pubkey = "0x52a2abe8940ae83a48e707a4d583db5b8e40a2b5";
                    return [4 /*yield*/, _provider.requestSuiFromFaucet(_pubkey)];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    return [2 /*return*/];
            }
        });
    });
}
// getRequestTestToken();
/*
* ?????? ??????
*/
function isSuiAddress() {
    return __awaiter(this, void 0, void 0, function () {
        var pubkey, SUI_ADDRESS_LENGTH, checkReg1, checkReg2, checkReg3;
        return __generator(this, function (_a) {
            pubkey = '0x18ef8032392a821b3092b7f0e044cc05bb39bb8a';
            SUI_ADDRESS_LENGTH = 20;
            checkReg1 = /^(0x|0X)?[a-fA-F0-9]+$/.test(pubkey) && pubkey.length % 2 === 0;
            checkReg2 = /^(0x|0X)/.test(pubkey) ? (pubkey.length - 2) / 2 : pubkey.length / 2;
            checkReg3 = SUI_ADDRESS_LENGTH;
            console.log("checkReg1 : ".concat(checkReg1, ", checkReg2 : ").concat(checkReg2, ", checkReg3 : ").concat(checkReg3));
            console.log(checkReg1 && checkReg2 === checkReg3);
            return [2 /*return*/, (checkReg1 && checkReg2 === checkReg3)];
        });
    });
}
isSuiAddress();
