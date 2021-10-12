if (process.env.NODE_ENV === 'production') {
    module.exports = require('./matic-web3.node.min.js')
} else {
    module.exports = require('./matic-web3.node.js')
}
