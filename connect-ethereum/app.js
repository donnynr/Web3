const Web3 = require("web3");
const ethNetwork = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

try {
        const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
        console.log("Connection Successfull!");
        console.log("Latest Block Number: ");
        web3.eth.getBlockNumber().then(console.log);
}
catch(e) {
        console.log("Connection Error!", e);
}