import { Provider } from './provider';
import { JsonRpcClient } from '../rpc/client';
import { ExecuteTransactionRequestType, CoinDenominationInfoResponse, GatewayTxSeqNumber, GetObjectDataResponse, GetTxnDigestsResponse, ObjectId, ObjectOwner, Ordering, PaginatedTransactionDigests, SubscriptionId, SuiAddress, SuiEventEnvelope, SuiEventFilter, SuiEvents, SuiExecuteTransactionResponse, SuiMoveFunctionArgTypes, SuiMoveNormalizedFunction, SuiMoveNormalizedModule, SuiMoveNormalizedModules, SuiMoveNormalizedStruct, SuiObjectInfo, SuiObjectRef, SuiTransactionResponse, TransactionDigest, TransactionQuery, RpcApiVersion } from '../types';
import { SignatureScheme } from '../cryptography/publickey';
import { WebsocketClient, WebsocketClientOptions } from '../rpc/websocket-client';
/**
 * Configuration options for the JsonRpcProvider. If the value of a field is not provided,
 * value in `DEFAULT_OPTIONS` for that field will be used
 */
export declare type RpcProviderOptions = {
    /**
     * Default to `true`. If set to `false`, the rpc
     * client will throw an error if the responses from the RPC server do not
     * conform to the schema defined in the TypeScript SDK. If set to `true`, the
     * rpc client will log the mismatch as a warning message instead of throwing an
     * error. The mismatches often happen when the SDK is in a different version than
     * the RPC server. Skipping the validation can maximize
     * the version compatibility of the SDK, as not all the schema
     * changes in the RPC response will affect the caller, but the caller needs to
     * understand that the data may not match the TypeSrcript definitions.
     */
    skipDataValidation?: boolean;
    /**
     * Configuration options for the websocket connection
     */
    socketOptions?: WebsocketClientOptions;
    /**
     * Cache timeout in seconds for the RPC API Version
     */
    versionCacheTimoutInSeconds?: number;
};
export declare class JsonRpcProvider extends Provider {
    endpoint: string;
    options: RpcProviderOptions;
    protected client: JsonRpcClient;
    protected wsClient: WebsocketClient;
    private rpcApiVersion;
    private cacheExpiry;
    /**
     * Establish a connection to a Sui RPC endpoint
     *
     * @param endpoint URL to the Sui RPC endpoint
     * @param options configuration options for the provider
     */
    constructor(endpoint: string, options?: RpcProviderOptions);
    getRpcApiVersion(): Promise<RpcApiVersion | undefined>;
    getMoveFunctionArgTypes(packageId: string, moduleName: string, functionName: string): Promise<SuiMoveFunctionArgTypes>;
    getNormalizedMoveModulesByPackage(packageId: string): Promise<SuiMoveNormalizedModules>;
    getNormalizedMoveModule(packageId: string, moduleName: string): Promise<SuiMoveNormalizedModule>;
    getNormalizedMoveFunction(packageId: string, moduleName: string, functionName: string): Promise<SuiMoveNormalizedFunction>;
    getNormalizedMoveStruct(packageId: string, moduleName: string, structName: string): Promise<SuiMoveNormalizedStruct>;
    getObjectsOwnedByAddress(address: string): Promise<SuiObjectInfo[]>;
    getGasObjectsOwnedByAddress(address: string): Promise<SuiObjectInfo[]>;
    getCoinDenominationInfo(coinType: string): CoinDenominationInfoResponse;
    getCoinBalancesOwnedByAddress(address: string, typeArg?: string): Promise<GetObjectDataResponse[]>;
    selectCoinsWithBalanceGreaterThanOrEqual(address: string, amount: bigint, typeArg?: string, exclude?: ObjectId[]): Promise<GetObjectDataResponse[]>;
    selectCoinSetWithCombinedBalanceGreaterThanOrEqual(address: string, amount: bigint, typeArg?: string, exclude?: ObjectId[]): Promise<GetObjectDataResponse[]>;
    getObjectsOwnedByObject(objectId: string): Promise<SuiObjectInfo[]>;
    getObject(objectId: string): Promise<GetObjectDataResponse>;
    getObjectRef(objectId: string): Promise<SuiObjectRef | undefined>;
    getObjectBatch(objectIds: string[]): Promise<GetObjectDataResponse[]>;
    getTransactions(query: TransactionQuery, cursor?: TransactionDigest | null, limit?: number | null, order?: Ordering): Promise<PaginatedTransactionDigests>;
    getTransactionsForObject(objectID: string, ordering?: Ordering): Promise<GetTxnDigestsResponse>;
    getTransactionsForAddress(addressID: string, ordering?: Ordering): Promise<GetTxnDigestsResponse>;
    getTransactionWithEffects(digest: TransactionDigest): Promise<SuiTransactionResponse>;
    getTransactionWithEffectsBatch(digests: TransactionDigest[]): Promise<SuiTransactionResponse[]>;
    executeTransactionWithRequestType(txnBytes: string, signatureScheme: SignatureScheme, signature: string, pubkey: string, requestType?: ExecuteTransactionRequestType): Promise<SuiExecuteTransactionResponse>;
    getTotalTransactionNumber(): Promise<number>;
    getTransactionDigestsInRange(start: GatewayTxSeqNumber, end: GatewayTxSeqNumber): Promise<GetTxnDigestsResponse>;
    getEventsByTransaction(digest: TransactionDigest, count?: number): Promise<SuiEvents>;
    getEventsByModule(package_: string, module: string, count?: number, startTime?: number, endTime?: number): Promise<SuiEvents>;
    getEventsByMoveEventStructName(moveEventStructName: string, count?: number, startTime?: number, endTime?: number): Promise<SuiEvents>;
    getEventsBySender(sender: SuiAddress, count?: number, startTime?: number, endTime?: number): Promise<SuiEvents>;
    getEventsByRecipient(recipient: ObjectOwner, count?: number, startTime?: number, endTime?: number): Promise<SuiEvents>;
    getEventsByObject(object: ObjectId, count?: number, startTime?: number, endTime?: number): Promise<SuiEvents>;
    getEventsByTimeRange(count?: number, startTime?: number, endTime?: number): Promise<SuiEvents>;
    subscribeEvent(filter: SuiEventFilter, onMessage: (event: SuiEventEnvelope) => void): Promise<SubscriptionId>;
    unsubscribeEvent(id: SubscriptionId): Promise<boolean>;
}
