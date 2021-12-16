const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledInbox  = require("./build/Inbox.json");

const provider = require('./truffle-config.js');

const web3 = new Web3(provider.networks.rinkeby.provider());

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account.', accounts[0]);

    const result = await new web3.eth.Contract(compiledInbox.abi)
                             .deploy({data: "0x" + compiledInbox.evm.bytecode.object, arguments:['Hi there!']})
                             .send({gas:1000000, from:accounts[0]});

    console.log("Contract Deployed to", result.options.address);

    provider.engine.stop();

};

deploy();