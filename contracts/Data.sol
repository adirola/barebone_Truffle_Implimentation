// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
//error can be ignored

contract Data {
    string public data;
    constructor(string memory initialData){
        data = initialData;
    }
    function setData(string memory newData) public {
        data = newData;
    }
}