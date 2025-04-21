// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RelicNFT is ERC721URIStorage, Ownable {
    uint256 public tokenIdCounter;

    // Base URI for all token metadata (hosted on IPFS, e.g., Pinata)
    string private baseTokenURI;

    constructor(string memory _baseTokenURI) Ownable(msg.sender) ERC721("ChronoRelic", "CNR") {
        baseTokenURI = _baseTokenURI;
    }

    function mint() external onlyOwner returns (uint256) {
        uint256 newId = tokenIdCounter;
        _safeMint(msg.sender, newId);

        // Construct full metadata URI for this token
        string memory uri = string(abi.encodePacked(
            baseTokenURI,
            Strings.toString(newId),
            ".json"
        ));

        _setTokenURI(newId, uri);
        tokenIdCounter++;
        return newId;
    }

    // Optional: allows you to update base URI later if needed
    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseTokenURI = _newBaseURI;
    }

    function getBaseURI() external view returns (string memory) {
        return baseTokenURI;
    }
}
