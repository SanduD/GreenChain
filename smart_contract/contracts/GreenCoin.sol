// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GreenCoin is ERC20 {

    uint256 constant initialSupply = 1000000 * (10**18);

    constructor() ERC20("GreenCoin", "GRC") {
        _mint(msg.sender, initialSupply);
    }
}