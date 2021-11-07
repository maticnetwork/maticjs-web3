import { ITransactionRequestConfig } from "@maticnetwork/maticjs";
import Web3 from "web3";
import { TransactionConfig } from "web3-core";

export const maticTxRequestConfigToWeb3 = (config: ITransactionRequestConfig = {}) => {
    const toHex = Web3.utils.toHex;
    return {
        chainId: toHex(config.chainId) as any,
        data: config.data,
        from: config.from,
        gas: config.gasLimit,
        gasPrice: config.gasPrice,
        nonce: config.nonce,
        to: config.to,
        value: config.value,
        maxFeePerGas: config.maxFeePerGas,
        maxPriorityFeePerGas: config.maxPriorityFeePerGas,
        type: toHex(config.type),
        hardfork: config.hardfork
    } as TransactionConfig;
};