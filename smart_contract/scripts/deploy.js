// scripts/deploy.js
const { ethers } = require('hardhat');

async function main() {
  // Get the contract owner
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  // Hardhat helper to get the ethers contractFactory object
  const GreenCoinContract = await ethers.getContractFactory('GreenCoin');

  // Deploy the contract
  console.log('Deploying GreenCoin...');
  const GreenCoin = await GreenCoinContract.deploy();
  await GreenCoin.deployed();
  console.log(`GreenCoin deployed to: ${GreenCoin.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
