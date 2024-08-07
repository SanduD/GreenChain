import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import {
  API_URL,
  TOKEN_CONTRACT_ADDRESS,
  PRIVATE_KEY,
  contractABI,
} from './constants.js'

const web3 = createAlchemyWeb3(API_URL)
const tokenContract = new web3.eth.Contract(contractABI, TOKEN_CONTRACT_ADDRESS)

const sendTx = async (_toAddress, _amountGRC) => {
  const fromAddress = '0x5d05B719ee22645b4BdcDbf2492AA2190e074c18'
  const toAddress = _toAddress

  const nonce = await web3.eth.getTransactionCount(fromAddress)
  const amount = web3.utils.toWei(_amountGRC.toString(), 'ether')
  var gasPrice = await web3.eth.getGasPrice()

  const data = tokenContract.methods.transfer(toAddress, amount).encodeABI()

  const transaction = {
    from: fromAddress,
    gasLimit: 300000,
    to: TOKEN_CONTRACT_ADDRESS,
    value: '0x0',
    data: data,
    gasPrice: web3.utils.toHex(gasPrice),
    nonce: web3.utils.toHex(nonce),
  }

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    PRIVATE_KEY
  )

  web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .on('receipt', receipt => {
      // console.log('Transaction receipt: ', receipt)
    })
    .on('error', error => {
      console.error('Error sending transaction: ', error)
    })
}

const getBalance = async address => {
  try {
    const balance = await tokenContract.methods.balanceOf(address).call()
    const formattedBalance = web3.utils.fromWei(balance, 'ether')
    return formattedBalance
  } catch (error) {
    console.error('Error trying to get the balance', error)
  }
}

const getAllTransactions = async walletAddress => {
  try {
    const data = await web3.alchemy.getAssetTransfers({
      fromBlock: '0x0',
      toBlock: 'latest',
      fromAddress: walletAddress,
      category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
    })

    // Process transactions to include the date
    const transactionsWithDates = await Promise.all(
      data.transfers.map(async transaction => {
        const blockNumber = web3.utils.hexToNumber(transaction.blockNum)
        const block = await web3.eth.getBlock(blockNumber)
        const date = new Date(block.timestamp * 1000)
          .toISOString()
          .split('T')[0]
        return { ...transaction, date }
      })
    )
    // console.log('transactionsWithDates:', transactionsWithDates)

    return transactionsWithDates
  } catch (error) {
    console.error('Error retrieving transactions:', error)
    return []
  }
}

export { sendTx, getBalance, getAllTransactions }

//test

// const _fromAddr = '0x5d05B719ee22645b4BdcDbf2492AA2190e074c18'
// const _toAddr = '0x109c116e1299879E5F86635A941493Fd667F3909'
// sendTx(_fromAddr, _toAddr, 100)

// sendTx(
//   '0x5d05B719ee22645b4BdcDbf2492AA2190e074c18',
//   '0x109c116e1299879E5F86635A941493Fd667F3909',
//   479
// )

// ;(async () => {
//   const address = '0x109c116e1299879E5F86635A941493Fd667F3909'
//   const balance = await getBalance(address)
//   console.log(`Balance of address ${address}: ${balance} GRC`)
// })()
