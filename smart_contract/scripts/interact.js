// scripts/interact.js
const { ethers } = require('hardhat');

async function main() {
  console.log('Getting the GreenCoin token contract...');
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const GreenCoinToken = await ethers.getContractAt('GreenCoin', contractAddress);
  console.log('Querying token name...');
  const name = await GreenCoinToken.name();
  console.log(`Token Name: ${name}\n`);

  console.log('Querying token symbol...');
  const symbol = await GreenCoinToken.symbol();
  console.log(`Token Symbol: ${symbol}\n`);

  // decimals()
  console.log('Querying decimals...');
  const decimals = await GreenCoinToken.decimals();
  console.log(`Token Decimals: ${decimals}\n`);

  // totalSupply()
  console.log('Querying token supply...');
  const totalSupply = await GreenCoinToken.totalSupply();
  console.log(`Total Supply including all decimals: ${totalSupply}`);
  console.log(`Total supply including all decimals comma separated: ${ethers.utils.commify(totalSupply)}`);
  console.log(`Total Supply in GRC: ${ethers.utils.formatUnits(totalSupply, decimals)}\n`);

  // balanceOf(address account)
  console.log('Getting the balance of contract owner...');
  const signers = await ethers.getSigners();
  const ownerAddress = signers[0].address;
  let ownerBalance = await GreenCoinToken.balanceOf(ownerAddress);
  console.log(
    `Contract owner at ${ownerAddress} has a ${symbol} balance of ${ethers.utils.formatUnits(
      ownerBalance,
      decimals,
    )}\n`,
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
