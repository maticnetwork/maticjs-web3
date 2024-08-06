import { erc721, from, posClient, posClientForTo, privateKey, RPC, to, toPrivateKey } from "./client";
import { expect } from 'chai'
import { ABIManager } from '@maticnetwork/maticjs'
import HDWalletProvider from "@truffle/hdwallet-provider";

describe('POS Client', () => {

    const abiManager = new ABIManager("testnet", "amoy");


    before(() => {
        return Promise.all([
            abiManager.init()
        ]);
    });

    it("pos client from init", async () => {
        await posClient.init({
            // log: true,
            network: 'testnet',
            version: 'amoy',
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
            version: 'amoy',
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

    const txHash = `0x92898987248eaec73dc56eee44f68084a2adcb13a83213590cce437d54aa17db`;
    it("null tx check getTransactionReceipt", async () => {
        try {
            await posClient.client.parent.getTransactionReceipt(txHash);
            throw "should have been error";
        } catch (error) {
            expect(error).eql({
                type: 'invalid_transaction' as any,
                message: 'Could not retrieve transaction. Either it is invalid or might be in archive node.'
            });
        }
    })

    it("null tx check getTransaction", async () => {
        try {
            await posClient.client.parent.getTransaction(txHash);
            throw "should have been error";
        } catch (error) {
            expect(error).eql({
                type: 'invalid_transaction' as any,
                message: 'Could not retrieve transaction. Either it is invalid or might be in archive node.'
            });
        }
    })
});
