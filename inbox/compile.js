const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
 
// get path to build folder
const buildPath = path.resolve(__dirname, "build");

// delete build folder
fs.removeSync(buildPath);
 
// get path to Campaigns.sol
const campaignPath = path.resolve(__dirname, "contracts", "Inbox.sol");

// read campaign file
const source = fs.readFileSync(campaignPath, "utf8");

// compile contracts and get contracts
let input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};

//module.exports = solc.compile(JSON.stringify(input));
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Inbox.sol"];
 
// // create build folder
// fs.ensureDirSync(buildPath);
 
// // loop over output and write each contract to different file in build directory
// if (output.errors) {
//   output.errors.forEach((err) => {
//     console.log(err.formattedMessage);
//   });
// } else {
//   const contracts = output.contracts["Inbox.sol"];
//   for (let contractName in contracts) {
//     const contract = contracts[contractName];
//     fs.writeFileSync(
//       path.resolve(buildPath, `${contractName}.json`),
//       JSON.stringify(contract.abi, null, 2),
//       "utf8"
//     );
//   }
// }