import "@openzeppelin/contracts/utils/Strings.sol";
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PoorGPT is ERC721URIStorage, Ownable {

    uint256 public totalSupply;
    uint256 public maxSupply = 1000;
    uint256 public mintPrice = 0.01 ether;

    constructor() ERC721("PoorGPT", "PGPT") {}

    function mint() public payable {
        require(totalSupply < maxSupply, "Sold out");
        require(msg.value >= mintPrice, "Not enough ETH");

        totalSupply++;

        _safeMint(msg.sender, totalSupply);

        // metadata link (CHANGE THIS)
        string memory uri = string(
            abi.encodePacked(
                "https://yourdomain.com/metadata/",
                Strings.toString(totalSupply),
                ".json"
            )
        );

        _setTokenURI(totalSupply, uri);
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
