import { IPlugin } from "@maticnetwork/maticjs";
import Web3 from "web3";
import { MaticBigNumber } from "./utils";
import { Web3Client } from "./web3";

export class Web3ClientPlugin implements IPlugin {
    setup(matic) {
        matic.utils.Web3Client = Web3Client;
        matic.utils.BN = MaticBigNumber;
        matic.utils.isBN = (value) => {
            return Web3.utils.isBN(value);
        };
    }
}

export * from "./utils";

/* tslint:disable-next-line */
export default Web3ClientPlugin;