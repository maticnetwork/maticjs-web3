import { ITransactionWriteResult } from "@maticnetwork/maticjs";
import { web3ReceiptToMaticReceipt } from "../utils";
import { doNothing } from "./do_nothing";

export class TransactionWriteResult implements ITransactionWriteResult {

    onTransactionHash: Function;
    onTransactionError: Function;
    onTransactionReceiptError: Function;

    onTransactionReceipt: Function;

    getReceipt;
    getTransactionHash;

    constructor(private promise: any) {
        const receiptPromise = new Promise<any>((res, rej) => {
            this.onTransactionReceipt = res;
            this.onTransactionReceiptError = rej;
        });
        this.getReceipt = () => {
            return receiptPromise.then(receipt => {
                return web3ReceiptToMaticReceipt(receipt);
            });
        };

        const txHashPromise = new Promise<string>((res, rej) => {
            this.onTransactionHash = res;
            this.onTransactionError = rej;
        });

        this.getTransactionHash = () => {
            return txHashPromise;
        };

        promise.once("transactionHash", this.onTransactionHash).
            once("receipt", this.onTransactionReceipt as any).
            on("error", this.onTransactionError).
            on("error", this.onTransactionReceiptError);
    }


}