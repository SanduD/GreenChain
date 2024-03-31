import abi from './GreenCoin.json' assert { type: 'json' }
const PRIVATE_KEY =
  '3322b452a32db786bf75bc9b48d66cb9d09364b5873c643a45f2f455e94f9ae0'
const TOKEN_CONTRACT_ADDRESS = '0x9C2cd3abDB56384d9c9A428E31b58c079d3998Cc'
const API_URL =
  'https://eth-sepolia.g.alchemy.com/v2/9eF-QJ9lN9S2-o7KC6gPp8SkGSPpAanc'
const contractABI = abi.abi
export { contractABI, PRIVATE_KEY, TOKEN_CONTRACT_ADDRESS, API_URL }
