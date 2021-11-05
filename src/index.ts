import { IPlugin } from "@maticnetwork/maticjs";
import { Web3Client } from "./web3";

export class Web3ClientPlugin implements IPlugin {
    setup(matic) {
        matic.utils.Web3Client = Web3Client;
    }
}

export * from "./web3";

export default Web3ClientPlugin;