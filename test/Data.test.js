// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const { abi, evm } = require("../compile");

// node web3 import is in upercase because this import is essentially a contructor function.It is used to create instances of the web3 library
// by tradition we always capitalise the first letter of a constructor function
const Web3 = require('web3');


//this is the ganache instance of web3
const web3 = new Web3(ganache.provider());

const INITIAL_STRING_DATA = 'Hi There!'

let accounts,inbox;

beforeEach(async()=>{

    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(abi)).deploy({data:evm.bytecode.object,arguments:[INITIAL_STRING_DATA]}).send({from:accounts[0],gas:'1000000'})
})

describe('Inbox', ()=>{
    it('contract deployed', ()=>{
        //console.log(inbox.options);
        assert.ok(inbox.options.address);
    });

    it('has a default message',async()=>{
        const message = await inbox.methods.data().call();
        console.log(message)
        assert.equal(message,INITIAL_STRING_DATA);
    });

    it('can change the message', async()=>{
        await inbox.methods.setData('Bye There!').send({from:accounts[0],gas:'1000000'});
        const message = await inbox.methods.data().call();
        assert.equal(message,"Bye There!")
    });
})