const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const mnemonicPhrase = process.env.REACT_APP_MNEMONIC_PHRASE;
const { abi, evm } = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: process.env.REACT_APP_WEB3_PROVIDER_URL
});
const web3 = new Web3(provider);

const deploy = async() => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + evm.bytecode.object })
    .send({ from: accounts[0] });
    console.log(abi);
  console.log('Contract deployed to', result.options.address);
};
deploy();