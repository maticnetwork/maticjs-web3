import { IPlugin } from "@maticnetwork/maticjs";
import Web3 from "web3";
import { Web3Client } from "./web3";

export class Web3ClientPlugin implements IPlugin {
    setup(matic) {
        matic.utils.Web3Client = Web3Client;
        matic.utils.isBN = (value) => {
            return Web3.utils.isBigNumber(value);
        }
    }
}

export * from "./web3";

export default Web3ClientPlugin;