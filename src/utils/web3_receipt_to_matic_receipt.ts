import { ITransactionReceipt } from "@maticnetwork/maticjs";


export const web3ReceiptToMaticReceipt = (receipt: any) => {
    return {
        blockHash: receipt.blockHash,
        blockNumber: receipt.blockNumber,
        contractAddress: receipt.contractAddress,
        cumulativeGasUsed: receipt.cumulativeGasUsed,
        from: receipt.from,
        gasUsed: receipt.gasUsed,
        status: receipt.status,
        to: receipt.to,
        transactionHash: receipt.transactionHash,
        transactionIndex: receipt.transactionIndex,
        events: receipt.events,
        logs: receipt.logs,
        logsBloom: receipt.logsBloom,
        root: (receipt as any).root,
        type: (receipt as any).type
    } as ITransactionReceipt;

};