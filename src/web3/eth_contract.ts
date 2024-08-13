import { BaseContract } from "@maticnetwork/maticjs";
import { Contract, ContractAbi} from "web3";
import { EthMethod } from "./eth_method";

export class Web3Contract extends BaseContract {
    contract: Contract<ContractAbi>;

    constructor(address: string, contract: Contract<ContractAbi>, logger) {
        super(address, logger);
        this.contract = contract;
    }

    method(methodName: string, ...args) {
        this.logger.log("methodName", methodName, "args method", arguments);
        return new EthMethod(
            this.address, this.logger, this.contract.methods[methodName](...args)
        );
    }
}
