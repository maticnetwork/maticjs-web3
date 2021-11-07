import { BaseContractMethod, Logger, ITransactionRequestConfig, Converter } from "@maticnetwork/maticjs";
import Web3 from "web3";
import { TransactionObject, Tx } from "web3/eth/types";
import { doNothing } from "../helpers";
import { maticTxRequestConfigToWeb3 } from "../utils";

export class EthMethod extends BaseContractMethod {

    constructor(public address, logger: Logger, private method: TransactionObject<any>) {
        super(logger);
    }

    toHex(value) {
        return value != null ? Web3.utils.toHex(value) : value;
    }

    read<T>(tx: ITransactionRequestConfig): Promise<T> {
        this.logger.log("sending tx with config", tx);
        return this.method.call(
            maticTxRequestConfigToWeb3(tx) as any
        );
    }

    write(tx: ITransactionRequestConfig) {
        const result = {
            onTransactionHash: (doNothing as any),
            onReceipt: doNothing,
            onReceiptError: doNothing,
            onTxError: doNothing
        };
        setTimeout(() => {
            this.logger.log("sending tx with config", tx);
            this.method.send(
                maticTxRequestConfigToWeb3(tx) as any
            ).once("transactionHash", result.onTransactionHash).
                once("receipt", result.onReceipt).
                on("error", result.onTxError).
                on("error", result.onReceiptError);
        }, 0);
        return result;
    }

    estimateGas(tx: ITransactionRequestConfig): Promise<number> {
        return this.method.estimateGas(
            maticTxRequestConfigToWeb3(tx) as any
        );
    }

    encodeABI() {
        return this.method.encodeABI();
    }

}
