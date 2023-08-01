const config = {
  solidity: "version",
  networks: {
    hardhat: {},
    cronosDevnet: {
      url: "https://evm-dev-t3.cronos.org/",
      chainId: 338,
      accounts: [],
      gasPrice: 5000000000000,
    },
    cronosTestnet: {
      url: "https://evm-t3.cronos.org/",
      chainId: 338,
      accounts: ["myPrivateKey"],
      gasPrice: 5000000000000,
    },
    cronos: {
      url: "https://evm.cronos.org/",
      chainId: 25,
      accounts: ["myPrivateKey"],
      gasPrice: 5000000000000,
    },
  },
  etherscan: {
    apiKey: {
      cronosTestnet: "{YOUR_CRONOSCAN_TESTNET_API_KEY}",
      cronos: "{YOUR_CRONOSCAN_API_KEY}",
    },
  },
};
