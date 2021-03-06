const fs = require("fs");
const solc = require("solc"); // Only here because solcjs can't compile Solidity into a JS contract object, even JSON. It requires JSON input to do that. Make sure to take this out ot eh package.json dependencies when you remove it from here.

const Web3 = require("web3");

global.web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8082"));

const compiled = solc.compile(fs.readFileSync("./BlockParty.sol", "utf8"));
console.log(compiled);
const abi = JSON.parse(compiled.contracts[":BlockParty"].interface);
const bytecode = compiled.contracts[":BlockParty"].bytecode;

global.contract = new web3.eth.Contract(abi);
contract
  .deploy({
    data: bytecode
  })
  .send({
    from: process.argv[2],
    gas: 1500000 // copied from https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#id11
  })
  .on("error", error => console.error(error))
  .then(newContractInstance => {
    console.log("Y's address:", newContractInstance.options.address);
    contract.options.address = newContractInstance.options.address;
  });

require("repl").start();
