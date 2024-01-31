
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const compiledFactory = require("./build/CampaignFactory.json");


const provider = new HDWalletProvider(
  'push increase sting section garment present shoe habit put recycle slow post', //mneumonic phrase for my metamask wallet 
  'https://sepolia.infura.io/v3/07034a982a934bd0bdb403c20973e4ef' //sepolia test endpoint from Infu
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const balance= await web3.eth.getBalance(accounts[1]);
  console.log('Attempting to deploy from account', accounts[1]);
  console.log(' account balance', balance);
try{
  
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[1] });

  //console.log(interface);
  console.log("Contract deployed to", result.options.address);
}
catch(err){
  console.log(err);
}
  provider.engine.stop();
};
deploy();
