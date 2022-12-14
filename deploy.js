// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi,evm} = require('./compile')

//to setup and derive accounts from mnemonic
const accountMnemonic = "";
const JSONRpcURL = "";

const provider = new HDWalletProvider(accountMnemonic,JSONRpcURL);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deply from account',accounts[0]);
    const contract = await new web3.eth.Contract(JSON.parse(abi)).deploy({data:evm.bytecode.object,arguments:[INITIAL_STRING_MESSAGE]}).send({from:accounts[0],gas:'1000000'})
    console.log('Contract deployed to',contract.options.address);
    //to prevent a hanging deployment
    provider.engine.stop();
};
deploy();
