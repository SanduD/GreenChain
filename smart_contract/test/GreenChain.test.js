const { expect } = require('chai');
const { ethers } = require('hardhat');

// Start test block
describe('GreenCoin', function () {
  before(async function () {
    this.GreenCoinContract = await ethers.getContractFactory('GreenCoin');
  });

  beforeEach(async function () {
    this.GreenCoin = await this.GreenCoinContract.deploy();
    await this.GreenCoin.deployed();

    this.decimals = await this.GreenCoin.decimals();

    const signers = await ethers.getSigners();

    this.ownerAddress = signers[0].address;
    this.recipientAddress = signers[1].address;

    this.signerContract = this.GreenCoin.connect(signers[1]);
  });

  // Test cases
  it('Creates a token with a name', async function () {
    expect(await this.GreenCoin.name()).to.exist;
    // expect(await this.GreenCoin.name()).to.equal('GreenCoin');
  });

  it('Creates a token with a symbol', async function () {
    expect(await this.GreenCoin.symbol()).to.exist;
    // expect(await this.GreenCoin.symbol()).to.equal('FUN');
  });

  it('Has a valid decimal', async function () {
    expect((await this.GreenCoin.decimals()).toString()).to.equal('18');
  });

  it('Has a valid total supply', async function () {
    const expectedSupply = ethers.utils.parseUnits('1000000', this.decimals);
    expect((await this.GreenCoin.totalSupply()).toString()).to.equal(expectedSupply);
  });

  it('Is able to query account balances', async function () {
    const ownerBalance = await this.GreenCoin.balanceOf(this.ownerAddress);
    expect(await this.GreenCoin.balanceOf(this.ownerAddress)).to.equal(ownerBalance);
  });

  it('Transfers the right amount of tokens to/from an account', async function () {
    const transferAmount = 1000;
    await expect(this.GreenCoin.transfer(this.recipientAddress, transferAmount)).to.changeTokenBalances(
      this.GreenCoin,
      [this.ownerAddress, this.recipientAddress],
      [-transferAmount, transferAmount],
    );
  });

  it('Emits a transfer event with the right arguments', async function () {
    const transferAmount = 100000;
    await expect(
      this.GreenCoin.transfer(this.recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals)),
    )
      .to.emit(this.GreenCoin, 'Transfer')
      .withArgs(
        this.ownerAddress,
        this.recipientAddress,
        ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
      );
  });

  it('Allows for allowance approvals and queries', async function () {
    const approveAmount = 10000;
    await this.signerContract.approve(
      this.ownerAddress,
      ethers.utils.parseUnits(approveAmount.toString(), this.decimals),
    );
    expect(await this.GreenCoin.allowance(this.recipientAddress, this.ownerAddress)).to.equal(
      ethers.utils.parseUnits(approveAmount.toString(), this.decimals),
    );
  });

  it('Emits an approval event with the right arguments', async function () {
    const approveAmount = 10000;
    await expect(
      this.signerContract.approve(this.ownerAddress, ethers.utils.parseUnits(approveAmount.toString(), this.decimals)),
    )
      .to.emit(this.GreenCoin, 'Approval')
      .withArgs(
        this.recipientAddress,
        this.ownerAddress,
        ethers.utils.parseUnits(approveAmount.toString(), this.decimals),
      );
  });

  it('Allows an approved spender to transfer from owner', async function () {
    const transferAmount = 10000;
    await this.GreenCoin.transfer(
      this.recipientAddress,
      ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
    );
    await this.signerContract.approve(
      this.ownerAddress,
      ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
    );
    await expect(
      this.GreenCoin.transferFrom(this.recipientAddress, this.ownerAddress, transferAmount),
    ).to.changeTokenBalances(
      this.GreenCoin,
      [this.ownerAddress, this.recipientAddress],
      [transferAmount, -transferAmount],
    );
  });

  it('Emits a transfer event with the right arguments when conducting an approved transfer', async function () {
    const transferAmount = 10000;
    await this.GreenCoin.transfer(
      this.recipientAddress,
      ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
    );
    await this.signerContract.approve(
      this.ownerAddress,
      ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
    );
    await expect(
      this.GreenCoin.transferFrom(
        this.recipientAddress,
        this.ownerAddress,
        ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
      ),
    )
      .to.emit(this.GreenCoin, 'Transfer')
      .withArgs(
        this.recipientAddress,
        this.ownerAddress,
        ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
      );
  });
});
