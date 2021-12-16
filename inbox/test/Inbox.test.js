// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledInbox  = require("../build/Inbox.json");

let accounts;
let inbox;

beforeEach(async () => {

    //Get a list of all Accounts
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(compiledInbox.abi)
        .deploy({ data: "0x" + compiledInbox.evm.bytecode.object, arguments : ['Hello!!'] })
        .send({ from: accounts[0], gas: "1500000" });

});

describe('Inbox', () => {
    it('Test GetMessage', () => {
        assert.ok(inbox.options.address);
    });

     it( 'Get Message is OK', async () => {
         const initialMessage = await inbox.methods.getMessage().call();
        assert.equal("Hello!!", initialMessage );
     });

    it( 'Set Message is OK', async () => {
         //set message and submit transaction
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });

        //retrieve new message and assert
        const message = await inbox.methods.getMessage().call();
        assert.equal(message, 'bye');
    });
});