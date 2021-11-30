import { erc721, from, posClient, posClientForTo, privateKey, RPC, to, toPrivateKey } from "./client";
import { expect } from 'chai'
import { ABIManager } from '@maticnetwork/maticjs'
import HDWalletProvider from "@truffle/hdwallet-provider";

describe('POS Client', () => {

    const abiManager = new ABIManager("testnet", "mumbai");
    

    before(() => {
        return Promise.all([
            abiManager.init()
        ]);
    });

    it("pos client from init", async () => {
        await posClient.init({
            // log: true,
            network: 'testnet',
            version: 'mumbai',
            parent: {
                provider: new HDWalletProvider(privateKey, RPC.parent),
                defaultConfig: {
                    from
                }
            },
            child: {
                provider: new HDWalletProvider(privateKey, RPC.child),
                defaultConfig: {
                    from
                }
            }
        });
    })

    it("pos client to init", async () => {
        await posClientForTo.init({
            // log: true,
            network: 'testnet',
            version: 'mumbai',
            parent: {
                provider: new HDWalletProvider(toPrivateKey, RPC.parent),
                defaultConfig: {
                    from: to
                }
            },
            child: {
                provider: new HDWalletProvider(toPrivateKey, RPC.child),
                defaultConfig: {
                    from: to
                }
            }
        });
    })
});
