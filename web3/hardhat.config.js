require("@matterlabs/hardhat-zksync-solc");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    etherscan: {
      apiKey: process.env.ETHER_SCAN_API_KEY,
    },
    defaultNetwork: "sepolia",
    networks: {
      sepolia: {
        url: "https://sepolia.rpc.thirdweb.com",
        accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
