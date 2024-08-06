const { setProofApi, POSClient, use, Converter, utils } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, rpc, pos } = require("./config");
use(Web3ClientPlugin);
const from = user1.address;

const execute = async () => {

  // return console.log(Converter.toHex('10'), new utils.BN('10').toString(16))


  const privateKey = user1.privateKey;
  const childERC20 = pos.child.erc20;
  const parentERC20 = pos.parent.erc20;

  const client = new POSClient();


  await client.init({
    log: true,
    network: 'testnet',
    version: 'amoy',
    parent: {
      provider: new HDWalletProvider(privateKey, rpc.parent),
      defaultConfig: {
        from
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, rpc.child),
      defaultConfig: {
        from
      }
    }
  });
  console.log("init called");

  const childERC20Token = client.erc20(childERC20);
  const parentERC20Token = client.erc20(parentERC20, true);
  const goerliERC721Token = client.erc721(pos.parent.erc721, true);
  const mumbaiERC721Token = client.erc721(pos.child.erc721);

  const txReceipt = await client.client.parent.getTransactionReceipt('0x92898987248eaec73dc56eee44f68084a2adcb13a83213590cce437d54aa17db')

  return console.log(txReceipt)

  // return console.log(await client.isDeposited('0xc67599f5c967f2040786d5924ec55d37bf943c009bdd23f3b50e5ae66efde258'));


  // const balance = await childERC20Token.getBalance(
  //   from
  // );
  // return console.log("balance", balance);

  // const tokens = await goerliERC721Token.getAllTokens(
  //   from
  // );
  // return console.log("tokens", tokens);

  const tx = await parentERC20Token.approveMax({
    // maxPriorityFeePerGas: 2000000000,
    // returnTransaction: true
  });

  // const tx = await goerliERC721Token.depositMany(['70362948865848051982628883253610138761681237831617060123833093242173388773544'], from, {
  //   returnTransaction: true
  // });
  // setProofApi("https://apis.matic.network")
  // const tx = await parentERC20Token.withdrawExitFaster(
  //   '0x1c20c41b9d97d1026aa456a21f13725df63edec1b1f43aacb180ebcc6340a2d3', {
  //   returnTransaction: true
  // });

  // console.log('tx', tx);

  //   const payload = await client.exitUtil.buildPayloadForExit(
  //     '0x1c20c41b9d97d1026aa456a21f13725df63edec1b1f43aacb180ebcc6340a2d3',
  //     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  //     false
  // )
  // return  //console.log("payload", payload, "length", payload.length);


  // // setProofApi("https://apis.matic.network")
  // // const tx = await parentERC20Token.withdrawExit('0xd6f7f4c6052611761946519076de28fbd091693af974e7d4abc1b17fd7926fd7');
  console.log("txHash", await tx.getTransactionHash());
  console.log("txReceipt", await tx.getReceipt());

  //txhash to plasma exit - 0x63aa095e0d6ee8698399b871daa202eb5522933e2d94c5929cf0fb86b6b0c628
  const tokenId = '60399350241383852757821046101235634991156913804166740995010931519407953501076'

  // const tx = await (client['client_']).child.getTransactionCount(from, 'pending');
  // console.log("tx", tx);
  // const result = await client.isCheckPointed('0x41162584974896bfc96d91e7ce72009373cd31acabe92024950831ee7b8067c0')
  // console.log("result", result);
  // const tx = await goerliERC721Token.withdrawChallenge(
  //   '0x41162584974896bfc96d91e7ce72009373cd31acabe92024950831ee7b8067c0',
  //   {
  //     // nonce: 11793,
  //     // gasPrice: '1000',
  //     // gas: 10000,
  //     // returnTransaction: true,
  //     // gasPrice: '4000000000',
  //     // returnTransaction: true,
  //     gasLimit: 1046107,
  //   }
  // );
  // console.log("tx", tx)
  // console.log("txHash", await tx.getTransactionHash());
  // console.log("txReceipt", await tx.getReceipt());
}

execute().then(_ => {
  process.exit(0)
}).catch(err => {
  console.error(err);
  process.exit(0);
})
