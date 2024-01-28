const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");
//updated web3 and hdwallet-provider imports added for convenience
const provider = new HDWalletProvider(
  "cupboard envelope lecture dumb explain razor prize leaf critic rice air gentle",
  "https://sepolia.infura.io/v3/4a89b0f3dbe34162a82439ec5a3857a5"
);
const web3 = new Web3(provider);

// deploy code will go here
const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ["Hi there!"] })
      .send({ gas: "1000000", from: accounts[0] });
    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
  } catch (e) {
    console.log(e);
  }
};
deploy();
