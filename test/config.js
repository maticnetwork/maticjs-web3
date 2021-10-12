// Testnet V3 config
module.exports = {
    rpc: {
        parent: '',
        child: 'https://rpc-mumbai.matic.today', // This is the MATIC testnet RPC
    },
    pos: {
        parent: {
            erc20: '0x655f2166b0709cd575202630952d71e2bb0d61af'
        },
        child: {
            erc20: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
            
        },
    },
    user1: {
        "privateKey": "",
        "address": ""
    },
    user2: {
        address: '<paste address here>', // Your address
    },
}
