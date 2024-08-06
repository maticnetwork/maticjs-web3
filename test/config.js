// const dotenv = require('dotenv');
// const path = require('path');
// const env = dotenv.config({
//     path: path.join(__dirname, '.env')
// });
module.exports = {
    rpc: {
        parent: process.env.ROOT_RPC,
        child: process.env.MATIC_RPC || 'https://rpc-amoy.polygon.technology',
    },
    pos: {
        parent: {
            erc20: '0x3fd0A53F4Bf853985a95F4Eb3F9C9FDE1F8e2b53'
        },
        child: {
            erc20: '0x0000000000000000000000000000000000001010'
        },
    },
    user1: {
        "privateKey": process.env.USER1_PRIVATE_KEY,
        "address": process.env.USER1_FROM
    },
    user2: {
        address: process.env.USER2_FROM, // Your address
        "privateKey": process.env.USER2_PRIVATE_KEY
    },
}
