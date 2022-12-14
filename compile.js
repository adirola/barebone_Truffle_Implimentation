// compile code will go here
const path = require('path');
const fs = require('fs');
const solc = require('solc');

//build a path to Inbox.sol
const inboxPath = path.resolve(__dirname,'contracts','Data.sol');

//command to read the content of Inbox.sol using the filesyste two arguments are path and file encoding system
const source = fs.readFileSync(inboxPath,'utf8');


const input = {
    language: 'Solidity',
    sources: {
      'Data.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };


//command to compile the code 1 argument is for the file 2 argument is for the number of contracts to be compiled
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Data.sol'
  ].Data;




