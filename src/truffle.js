/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var HDWalletProvider = require("truffle-hdwallet-provider-privkey");
var infura_apikey = "e7cf61fe75a64b2f91459362e0e5beb8"; // Either use this key or get yours at https://infura.io/signup. It's free.
var privKeys = "52f0d9c78c406446a465651010e23766f47bc13dc19bd7ca30a10ac1d15ce7e4";


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 777, // Match any network id
      gas: 0xfffffffffff,
      gasPrice: 0x01,
      // from: '0xd006b8df15798dd798acdd56ace7663ce614ad81' 
    },

    ropsten: {
      provider: new HDWalletProvider(privKeys, "https://ropsten.infura.io/" + infura_apikey),
      network_id: 3,
      from: '0x83e5353fc26643c29b041a3b692c6335c97a9aed', 
      gas: 5700000
    },

    ropsten2: {
      provider: new HDWalletProvider("7cfdbd32bc43117184eee7a404e328b7c681cdfb0166f93e14ac25463a4b2745", "https://ropsten.infura.io/" + infura_apikey),
      network_id: 3,
      from: '0xa867a6a820928c64ffe3e30166481ec526d38bc5', 
      gas: 4700000
    },

    coverage: {
      host: "127.0.0.1",
      port: 8545, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01, // <-- Use this low gas price
      network_id: 777, // Match any network id
    }
  },


};