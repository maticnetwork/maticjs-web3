import { Web3Contract } from "./eth_contract";
import Web3 from "web3";
import { Transaction } from "web3/eth/types";
import { AbstractProvider } from "web3-core";
import { doNothing, TransactionWriteResult } from "../helpers";
import { BaseWeb3Client, IBlockWithTransaction, IJsonRpcRequestPayload, IJsonRpcResponse, ITransactionRequestConfig, ITransactionData, ITransactionReceipt, Logger, ERROR_TYPE, IError } from "@maticnetwork/maticjs";
import { maticTxRequestConfigToWeb3, web3ReceiptToMaticReceipt, web3TxToMaticTx } from "../utils";

export class Web3Client extends BaseWeb3Client {
    private web3_: Web3;

    constructor(provider: any, logger: Logger) {
        super(logger);
        this.web3_ = new Web3(provider);
    }


    read(config: ITransactionRequestConfig) {
        return this.web3_.eth.call(
            maticTxRequestConfigToWeb3(config)
        );
    }

    write(config: ITransactionRequestConfig) {
        return new TransactionWriteResult(
            this.web3_.eth.sendTransaction(
                maticTxRequestConfigToWeb3(config)
            )
        );
    }

    getContract(address: string, abi: any) {
        const cont = new this.web3_.eth.Contract(abi, address);
        return new Web3Contract(address, cont as any, this.logger);
    }

    getGasPrice() {
        return this.web3_.eth.getGasPrice();
    }

    estimateGas(config: ITransactionRequestConfig) {
        return this.web3_.eth.estimateGas(
            maticTxRequestConfigToWeb3(config)
        );
    }

    getTransactionCount(address: string, blockNumber: any) {
        return this.web3_.eth.getTransactionCount(address, blockNumber);
    }

    getChainId() {
        return this.web3_.eth.net.getId();
    }

    private ensureTransactionNotNull_(data) {
        if (!data) {
            throw {
                type: 'invalid_transaction' as any,
                message: 'Could not retrieve transaction. Either it is invalid or might be in archive node.'
            } as IError;
        }
    }

    getTransaction(transactionHash: string) {
        return this.web3_.eth.getTransaction(transactionHash).then(data => {
            this.ensureTransactionNotNull_(data);
            return web3TxToMaticTx(data);
        });
    }

    getTransactionReceipt(transactionHash: string): Promise<ITransactionReceipt> {
        return this.web3_.eth.getTransactionReceipt(transactionHash).then(data => {
            this.ensureTransactionNotNull_(data);
            return web3ReceiptToMaticReceipt(data);
        });
    }

    getBlock(blockHashOrBlockNumber) {
        return (this.web3_.eth.getBlock(blockHashOrBlockNumber) as any);
    }

    getBalance(address) {
        return this.web3_.eth.getBalance(address);
    }

    getBlockWithTransaction(blockHashOrBlockNumber) {
        return this.web3_.eth.getBlock(blockHashOrBlockNumber, true).then(result => {
            const blockData: IBlockWithTransaction = result as any;
            blockData.transactions = result.transactions.map(tx => {
                return web3TxToMaticTx(tx);
            });
            return blockData;
        });
    }

    sendRPCRequest(request: IJsonRpcRequestPayload) {
        return new Promise<IJsonRpcResponse>((res, rej) => {
            (this.web3_.currentProvider as AbstractProvider).send(request, (error, result) => {
                if (error) return rej(error);
                res(result as any);
            });
        });
    }

    encodeParameters(params: any[], types: any[]) {
        return this.web3_.eth.abi.encodeParameters(types, params);
    }

    decodeParameters(hexString, types: any[]) {
        return this.web3_.eth.abi.decodeParameters(types, hexString) as any;
    }

    etheriumSha3(...value) {
        return Web3.utils.soliditySha3(...value);
    }

    hexToNumber(value) {
        return Web3.utils.hexToNumber(value);
    }

    hexToNumberString(value) {
        return Web3.utils.hexToNumberString(value);
    }
}