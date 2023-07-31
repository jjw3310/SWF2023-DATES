
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 
 
contract Dynamicsbt is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
 
    Counters.Counter private _tokenIdCounter;
 
    error ERC721OutOfBoundsIndex(address owner, uint256 index);

    mapping(address => bytes32[]) souls;

    mapping(address => uint[]) ownedtokens;

    mapping(string => address) private addressMapping;

    constructor() ERC721("SoulBound", "SBT") {}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721)
    {
        require(from == address(0), "Token not transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function safeMint(address to, bytes32 info) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        ownedtokens[to].push(tokenId);
        souls[msg.sender].push(info);
    }

    // function _balanceOf(address owner) public view returns(uint256)
 
    function _tokenOfOwnerArray(address owner) public view returns (uint[] memory) {
        return ownedtokens[owner];
    }
    
    // The following functions are overrides required by Solidity.
 
    function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
        super._burn(tokenId);
        // delete souls[msg.sender];
    }

    function getSouls() public view returns(bytes32[] memory) {
        return souls[msg.sender];
    }

    function getSoul() public view returns(bytes32) {
        uint soulLength = souls[msg.sender].length;
        return souls[msg.sender][soulLength-1];
    }
 
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function isAddressMapped(string memory _ci) public view returns(bool) {
        if (addressMapping[_ci] != address(0)) {
            return true;
        } else {
            return false;
        }
    }

    function setAddressMapping(string memory _ci, address _addr) public {
        addressMapping[_ci] = _addr;
    }

    function mintDataSBT(string memory _ci, string memory _info) public {
        safeMint(addressMapping[_ci], bytes32(abi.encodePacked(_info)));
    }
}