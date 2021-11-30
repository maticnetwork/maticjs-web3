import { POSClient, use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import Web3 from "web3";

import { pos } from "../../config";

use(Web3ClientPlugin);
const posClient = new POSClient();

window.onload = () => {
    document.querySelector('#btnConnect').addEventListener('click', async () => {
        if (!window.ethereum) {
            return alert("Metamask not installed or not enabled");
        }
        await window.ethereum.send('eth_requestAccounts');

        const from = window.ethereum.selectedAddress;

        const web3 = new Web3(window.ethereum);

        const chainId = await web3.eth.getChainId();

        // if network is goerli, then it is parent
        const isParent = chainId === 5;


        await posClient.init({
            log: true,
            network: "testnet",
            version: 'mumbai',
            parent: {
                provider: web3.currentProvider,
                defaultConfig: {
                    from: from
                }
            },
            child: {
                provider: web3.currentProvider,
                defaultConfig: {
                    from: from
                }
            }
        });

        const tokenAddress = isParent ? pos.parent.erc20 : pos.child.erc20;

        const erc20Token = posClient.erc20(
            tokenAddress
            , isParent
        )

        const balance = await erc20Token.getBalance(from);

        console.log("balance", balance);

        alert(`your balance is ${balance}`);
    })
}



