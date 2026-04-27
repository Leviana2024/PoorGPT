// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PoorGPT is ERC721URIStorage, Ownable {

    uint256 public totalSupply;
    uint256 public maxSupply = 1000;
    uint256 public mintPrice = 0.01 ether;

    string public baseURI;

    constructor() ERC721("PoorGPT", "PGPT") {
        baseURI = "https://yourdomain.com/metadata/"; // 🔥 CHANGE THIS
    }

    function mint() public payable {
        require(totalSupply < maxSupply, "Sold out");
        require(msg.value >= mintPrice, "Not enough ETH");

        totalSupply++;
        uint256 tokenId = totalSupply;

        _safeMint(msg.sender, tokenId);

        string memory finalURI = string(
            abi.encodePacked(baseURI, Strings.toString(tokenId), ".json")
        );

        _setTokenURI(tokenId, finalURI);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
