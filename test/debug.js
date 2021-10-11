const { use, POSClient } = require("@maticnetwork/maticjs");
const web3Plugin = require("@maticnetwork/maticjs-web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, rpc, pos } = require("./config");

const dotenv = require('dotenv');
dotenv.config();

use(web3Plugin);
const from = process.env.FROM || user1.address;

const execute = async () => {
    const privateKey = process.env.PRIVATE_KEY || user1.privateKey;
    const mumbaiERC20 = pos.child.erc20;
    const goerliERC20 = pos.parent.erc20;
    const rootRPC = process.env.ROOT_RPC || rpc.parent;
    const maticRPC = process.env.MATIC_RPC || rpc.child;
    const matic = new POSClient({
        network: 'testnet',
        version: 'mumbai',
        parent: {
            provider: new HDWalletProvider(privateKey, rootRPC),
            defaultConfig: {
                from
            }
        },
        child: {
            provider: new HDWalletProvider(privateKey, maticRPC),
            defaultConfig: {
                from
            }
        }
    });

    await matic.init();

    const rootTokenErc20 = matic.erc20(goerliERC20, true);
    const mumbaiTokenErc20 = matic.erc20(mumbaiERC20);

    // const result = await rootTokenErc20.mapChild();
    // const result = await mumbaiTokenErc20.withdrawStart(10);
    //  const txHash = await result.getTransactionHash();
    // console.log("txHash", txHash);
    // console.log("receipt", await result.getReceipt());

    // const result = await rootTokenErc20.withdrawExit('0xbb9051c6a55ad82122835dd6b656f62f2bf905452e844172f9d8ba6a98137f8c');
    // // console.log("result", result, typeof result);
    // const txHash = await result.getTransactionHash();
    // console.log("txHash", txHash);
    // console.log("receipt", await result.getReceipt());

    // const isCheckpointed = await mumbaiTokenErc20.isWithdrawExited('0xbb9051c6a55ad82122835dd6b656f62f2bf905452e844172f9d8ba6a98137f8c');
    // console.log("isWithdrawExited", isCheckpointed);

    const balanceRoot = await mumbaiTokenErc20.getBalance(from)
    console.log('balanceRoot', balanceRoot);
}

execute().then(_ => {
    process.exit(0)
}).catch(err => {
    console.error("error", err);
    process.exit(0);
})
