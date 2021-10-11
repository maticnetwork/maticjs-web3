import { IPlugin } from "@maticnetwork/maticjs";
import { Web3Client } from "./web3";

export class Web3Plugin implements IPlugin {
    setup(matic) {
        matic.Web3Client = Web3Client;
    }
}