// SPDX-License-Identifier: MIT

pragma solidity >=0.8.12;

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) { return payable(msg.sender); }
    function _msgData() internal view virtual returns (bytes memory) {
        this;
        return msg.data;
        }
    }
abstract contract Ownable is Context {
    address private _owner;

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }
    function owner() public view virtual returns (address) { return _owner; }
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
        }
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
        }
    }
library SafeMath {
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        uint256 c = a + b;
        if (c < a) return (false, 0);
        return (true, c);
        }
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (b > a) return (false, 0);
        return (true, a - b);
        }
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (a == 0) return (true, 0);
        uint256 c = a * b;
        if (c / a != b) return (false, 0);
        return (true, c);
        }
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (b == 0) return (false, 0);
        return (true, a / b);
        }
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (b == 0) return (false, 0);
        return (true, a % b);
        }
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
        }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
        }
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
        }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
        }
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: modulo by zero");
        return a % b;
        }
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        return a - b;
        }
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        return a / b;
        }
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        return a % b;
        }
    }
interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
    }
interface IERC721 is IERC165 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    }
contract TestContract is Ownable {
    using SafeMath for uint256;

    IERC721 public nftContract;
    constructor(address targetContract) { nftContract = IERC721(targetContract); }

    bool internal locked;
    modifier noreentry() {
        require(!locked, "No re-entrance");
        locked = true;
        _;
        locked = false;
        }
    modifier admin() { require(msg.sender == owner(), "Admin only"); _; }
    

    uint256 public volume;              // num of successfully traded
    uint256 public tradeVolume;         // value of successfully traded
    //uint256 public dailyVolume;         // num of daily successfully traded
    //uint256 public dailyTradeVolume;    // value of daily successfully traded
    uint256 public floor; // added by the most recent listing
    uint256 public listVolume;
    uint256 private escrow;
    uint256 public fee = 50; // of 1000

    // ongoing:   stop == 1 
    // canceled:  stop == 2
    // sent:      stop == 0 & start == 0
    // autioning: stop > start
    struct listing { uint256 tradeId; address account; uint256 value; uint256 start; uint256 stop; address to; } // id == tradeId, not nftId
    mapping(uint256 => listing[]) history;  // specific NFT's history, also indicates current status
    mapping(uint256 => listing) tradeId;     // iterator for ALL trades
    mapping(uint256 => uint256) sent;       // iterator for ALL sends

    struct bid { address account; uint256 amount; }
    mapping(uint256 => bid[]) bids;         // bids for tradeId
    mapping(address => uint256[]) myBids; // ignore zero

    // last x minted from (totalSupply)
    // last x listed
    // last x traded
    // last x sent
    // bid escrow
    // auction if end > block.timestamp
    /*
    function addTraded(uint256 _id, address _account, uint256 _value, uint256 _start, uint256 _stop) internal {
        if(traded.length > 0)
        if(traded[traded.length.length-1].stop < _stop - 86400)
        traded = new listing[];
        traded.push(listing(_id, _account, _value, _start, _stop));
    }*/

    function listTrade(uint256 _id, uint256 _value, uint256 _duration) public {
        listing memory _listing = history[_id][history[_id].length-1];
        require(_listing.stop == 1 || _listing.stop > _listing.start, "NFT already listed");
        sendNft(msg.sender, address(this), _id);

        _listing =_duration <= block.timestamp
            ? listing(_id, msg.sender, _value, block.timestamp, 1, address(0))
            : listing(_id, msg.sender, _value, block.timestamp, block.timestamp + _duration, address(0));
        history[_id].push(_listing);
        
        tradeId[listVolume++] = _listing;
        }
    function bestOffer(uint256 _tradeId) public returns(uint256 index) {
        uint256 i;
        while(i<bids[_tradeId].length) { index = bids[_tradeId][index].amount < bids[_tradeId][i++].amount ? index : i; }
        }
    function acceptBestOffer(uint256 _id) public {
        listing storage _listing = history[_id][history[_id].length -1];
        require(_listing.stop < block.timestamp, "NFT in auction");
        require(msg.sender == _listing.account, "Not NFT owner");

        bid memory _bestOffer = bids[_listing.tradeId][bestOffer(_listing.tradeId)];
        bids[_listing.tradeId][bestOffer(_listing.tradeId)].amount = 0;
        require(_bestOffer.amount != 0, "No offers");

        uint256 _fee = _bestOffer.amount * fee / 1000;
        _listing.stop == 0
            ? sendNft(msg.sender, _bestOffer.account, _id)
            : sendNft(address(this), _bestOffer.account, _id);
        require(address(this).balance >= _bestOffer.amount, "Insufficent contract balance");
        msg.sender.call{value: _bestOffer.amount - _fee}("");
        owner().call{value: _fee}("");
        
        escrowRefund(_listing.tradeId);
        tradeVolume += _bestOffer.amount;

        _listing.stop = block.timestamp;
        tradeId[_listing.tradeId].stop = _listing.stop;
        _listing.to = _bestOffer.account;
        
        tradeId[_listing.tradeId].stop = _listing.stop;
        tradeId[_listing.tradeId].to = _listing.to;

        listing memory newListing = listing(listVolume, _bestOffer.account, 0, 0, 0, address(0));
        tradeId[listVolume] = newListing;
        history[_id][history[_id].length] = newListing;
        }
    function claimWonAuction(uint256 _id) public {
        listing storage _listing = history[_id][history[_id].length -1];
        require(_listing.stop < block.timestamp, "NFT in auction");

        bid memory _bestOffer = bids[_listing.tradeId][bestOffer(_listing.tradeId)];
        bids[_listing.tradeId][bestOffer(_listing.tradeId)].amount = 0;
        require(_bestOffer.amount != 0, "Invalid offer");
        require(msg.sender == _bestOffer.account, "Not bid owner");

        sendNft(address(this), _bestOffer.account, _id);

        uint256 _fee = _bestOffer.amount * fee / 1000;
        require(address(this).balance >= _bestOffer.amount, "Insufficent contract balance");
        _listing.account.call{value: _bestOffer.amount - _fee}("");
        owner().call{value: _fee}("");

        escrowRefund(_listing.tradeId);
        tradeVolume += _bestOffer.amount;

        _listing.stop = block.timestamp;
        tradeId[_listing.tradeId].stop = _listing.stop;
        _listing.to = _bestOffer.account;
        
        tradeId[_listing.tradeId].stop = _listing.stop;
        tradeId[_listing.tradeId].to = _listing.to;

        listing memory newListing = listing(listVolume, _bestOffer.account, 0, 0, 0, address(0));
        tradeId[listVolume] = newListing;
        history[_id][history[_id].length] = newListing;
        }
    function adminCancelAuction(uint256 _id) public admin {
        listing storage _listing = history[_id][history[_id].length -1];
        require(_listing.stop == 2, "Sale already cancelled");
        require(_listing.stop < _listing.stop  , "Auction over");

        bid memory _bestOffer = bids[_listing.tradeId][bestOffer(_listing.tradeId)];
        require(_bestOffer.amount != 0, "Invalid offer");
        require(msg.sender == _bestOffer.account, "Not bid owner");

        sendNft(address(this), _listing.account, _id);
        escrowRefund(_listing.tradeId);

        _listing.stop = 0;
        tradeId[_listing.tradeId].stop = 2;
        }
    function cancelTrade(uint256 _tradeId) public {
        require(msg.sender == tradeId[tradeId].account || msg.sender == owner(), "Not NFT owner");
        uint256 _stop = history[_id][history[_id].length-1].stop;
        require(_stop == 1 || _stop > history[_id][history[_id].length-1].start, "NFT not listed");

        history[_id][history[_id].length-1].stop = 2;
        if(bids[_id].length > 0) { escrowRefund(_id); }
        }
    function cancelTrade2(uint256 _id) public {
        require(msg.sender == nftContract.ownerOf(_id) || msg.sender == owner(), "Not NFT owner");
        uint256 _stop = history[_id][history[_id].length-1].stop;
        require(_stop == 1 || _stop > history[_id][history[_id].length-1].start, "NFT not listed");

        history[_id][history[_id].length-1].stop = 2;
        }
    function escrowRefund(uint256 _tradeId) internal returns(bool success) {
        if(bids[_tradeId].length > 0) {
            for(uint256 i=0; i<bids[_tradeId].length; i++) {
                (success,) = bids[_tradeId][i].account.call{value: bids[_tradeId][i].amount}("");
                bids[_tradeId][i].amount = 0;
            }
        }
        }
    function cancelBid(uint256 _id) public returns(bool success) {
        require(bids[_id].length > 0);
        uint256 _stop = history[_id][history[_id].length-1].stop;
        require(_stop == 1 || _stop > history[_id][history[_id].length-1].start, "NFT sale complete");
        
        uint256 i=0;
        while(bids[_id][i].account != msg.sender) { i++; }
        require(bids[_id][i].account == msg.sender, "No bid exists");
        
        uint256 _amount = bids[_id][i].amount;
        if(_amount > 10**18) {
            bids[_id][i].amount = 0;
            escrow -= _amount;
            (success,) = bids[_id][i].account.call{value: _amount}("");
        }
        }
    function updateBid(uint256 _id, uint256 _value) public payable returns(bool success) {
        uint256 _stop = history[_id][history[_id].length-1].stop;
        require(_stop == 1 || _stop > history[_id][history[_id].length-1].start, "NFT sale complete");

        uint256 i=0;
        while(bids[_id][i].account != msg.sender) { i++; }
        require(bids[_id][i].account == msg.sender, "No bid exists");
        uint256 value = bids[_id][i].amount;
        require(value != _value);
        if(value < _value * 10**18) {
            require(msg.value >= _value - value, "Insufficent funds");
            escrow += msg.value;
        } else { (success,) = msg.sender.call{value: value - _value}(""); }
        bids[_id][i].amount = _value;
        }
    function createBid(uint256 _id, uint256 _value) public payable {
        require(msg.value >= _value);
        uint256 _stop = history[_id][history[_id].length-1].stop;
        require(_stop == 1 || _stop > history[_id][history[_id].length-1].start, "NFT sale complete");

        uint256 i=0;
        while(bids[_id][i].account != msg.sender) { i++; }
        require(bids[_id][i].account != msg.sender, "Bid already exists");
        bids[_id][i].amount = _value;
        escrow += _value;
        }
    function buyTrade(uint256 _id) public payable returns(bool, bool){
        listing memory _listing = history[_id][history[_id].length-1];
        
        require(_listing.tradeId != 0);
        require(msg.sender != _listing.account, "Already NFT owner");
        require(msg.value >= _listing.value, "MTV below sell price");
        require(_listing.stop == 1 || _listing.stop > _listing.start, "NFT not listed");

        uint256 _time = block.timestamp;
        uint256 _fee = _listing.value * 5 / 100;
        _listing.account.call{value: _listing.value - _fee}("");
        owner().call{value: _fee}("");

        history[_id][history[_id].length-1].stop = block.timestamp;
        //traded[volume++] = listing(_id, _account, _amount, history[_id][history[_id].length-1].start, block.timestamp);
        //tradeId
        tradeVolume += _listing.value;

        //safeTransferFrom(address from, address to, uint256 tokenId)
        // (success,) = bids[_id][i].account.call{value: bids[_id][i].amount}("");
        //bytes memory payload = abi.encodeWithSignature("safeTransferFrom(address, address, uint256)", address(this), masg.sender, _id);
        //(success,) = _token.call(payload);
        //nftContract.safeTransferFrom(
    }
    function sendNft(address _from, address _to, uint256 _id) internal {
        //bytes memory payload = abi.encodeWithSignature("safeTransferFrom(address, address, uint256)", _from, _to, _id);
        //(success,) = nftContract.call(payload);
        nftContract.approve(_to, _id);
        require(nftContract.safeTransferFrom(_from, _to, _id), "Not NFT owner");
    }


    

    function withdrawAll() public payable onlyOwner { require(payable(msg.sender).send(address(this).balance)); }
    // No tokens should be sent into the contract: burn / take them
    function burnRdnmTkn(address _token, address _to, uint256 _amount) external returns(bool success) { 
        bytes memory payload = abi.encodeWithSignature("transfer(address, uint256)", _to, _amount);
        (success,) = _token.call(payload);
        }
}
