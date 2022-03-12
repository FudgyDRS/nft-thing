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
    
// method to start auction
// method to start sale
// method to buy art
// method to offer buy art
// method to cancel auction
// method to cancel sale
// method to cancel offer
// method to see all current offers
// method to order auctions by ending soonest
// method to order sales by type, recent listed, price
// method to see all trade logs
// method to see all trade logs for specific NFT
// method to see all listing logs

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
    // aributration stop == 3
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
    // last x sent: cannot know, can only check if account of last history
    // bid escrow
    // auction if end > block.timestamp

    // list sell / auction
    function listTrade(uint256 _id, uint256 _value, uint256 _duration) public noreentry {
        listing memory _listing = history[_id][history[_id].length-1];
        require(_listing.stop == 1 || _listing.stop > _listing.start, "NFT already listed");
        sendNft(msg.sender, address(this), _id);

        // Add listing to NFTs history
        _listing =_duration <= block.timestamp
            ? listing(listVolume, msg.sender, _value, block.timestamp, 1, address(0))
            : listing(listVolume, msg.sender, _value, block.timestamp, block.timestamp + _duration, address(0));
        history[_id].push(_listing);
        
        // Add listing to tradeId
        tradeId[listVolume++] = _listing;
        }
    // return current best offer for NFT
    function bestOffer(uint256 _tradeId) public view returns(uint256 index) {
        uint256 i;
        while(i<bids[_tradeId].length) { index = bids[_tradeId][index].amount < bids[_tradeId][i++].amount ? index : i; }
        }
    // accept best offer (auction or stray offers) -> swap tokens and NFT
    function acceptBestOffer(uint256 _id) public noreentry {
        listing storage _listing = history[_id][history[_id].length -1];
        require(_listing.stop < block.timestamp, "NFT in auction");
        require(msg.sender == _listing.account, "Not NFT owner");

        // Reentry blocked by setting bid state to zero
        bid memory _bestOffer = bids[_listing.tradeId][bestOffer(_listing.tradeId)];
        bids[_listing.tradeId][bestOffer(_listing.tradeId)].amount = 0;
        require(_bestOffer.amount != 0, "No offers");

        // Swap NFT and Tokens
        // If stop time is 0, nftId is assigned to a user
        uint256 _fee = _bestOffer.amount * fee / 1000;
        _listing.stop == 0
            ? sendNft(msg.sender, _bestOffer.account, _id)
            : sendNft(address(this), _bestOffer.account, _id);
        require(address(this).balance >= _bestOffer.amount, "Insufficent contract balance");
        msg.sender.call{value: _bestOffer.amount - _fee}("");
        owner().call{value: _fee}("");
        escrow -= _bestOffer.amount;
        
        // Refund unused bids and increment trade volume
        escrowRefund(_listing.tradeId);
        tradeVolume += _bestOffer.amount;

        // Complete trade by adding 'stop' and 'to' to the history and tradeId listings
        _listing.stop = block.timestamp;
        _listing.to = _bestOffer.account;
        tradeId[_listing.tradeId].stop = _listing.stop;
        tradeId[_listing.tradeId].to = _listing.to;

        // Create new history and tradeId for new owner to accept static offers
        listing memory newListing = listing(listVolume, _bestOffer.account, 0, block.timestamp, 1, address(0));
        tradeId[listVolume] = newListing;
        history[_id][history[_id].length] = newListing;
        listVolume++;
        }
    // let winner of auction swap tokens and NFT
    function claimWonAuction(uint256 _id) public noreentry {
        listing storage _listing = history[_id][history[_id].length -1];
        require(_listing.stop < block.timestamp, "NFT in auction");

        // Reentry blocked by setting bid state to zero
        bid memory _bestOffer = bids[_listing.tradeId][bestOffer(_listing.tradeId)];
        bids[_listing.tradeId][bestOffer(_listing.tradeId)].amount = 0;
        require(_bestOffer.amount != 0, "Invalid offer");
        require(msg.sender == _bestOffer.account, "Not bid owner");

        // Swap NFT and Tokens
        sendNft(address(this), _bestOffer.account, _id);
        uint256 _fee = _bestOffer.amount * fee / 1000;
        require(address(this).balance >= _bestOffer.amount, "Insufficent contract balance");
        _listing.account.call{value: _bestOffer.amount - _fee}("");
        owner().call{value: _fee}("");
        escrow -= _bestOffer.amount;

        // Refund unused bids and increment trade volume
        escrowRefund(_listing.tradeId);
        tradeVolume += _bestOffer.amount;

        // Complete trade by adding 'stop' and 'to' to the history and tradeId listings
        _listing.stop = block.timestamp;
        _listing.to = _bestOffer.account;
        tradeId[_listing.tradeId].stop = _listing.stop;
        tradeId[_listing.tradeId].to = _listing.to;

        // Create new history and tradeId for new owner to accept static offers
        listing memory newListing = listing(listVolume, _bestOffer.account, 0, block.timestamp, 1, address(0));
        tradeId[listVolume] = newListing;
        history[_id][history[_id].length] = newListing;
        listVolume++;
        }
    // let admin revert an auction (if not ended)
    function adminCancelAuction(uint256 _id) public admin noreentry {
        listing storage _listing = history[_id][history[_id].length -1];
        require(_listing.stop != 2, "Sale already cancelled");
        require(_listing.stop > block.timestamp, "Auction over, bids locked");

        // Cancel trade by returning NFT and tokens
        sendNft(address(this), _listing.account, _id);
        escrowRefund(_listing.tradeId);
        _listing.stop = 2;
        tradeId[_listing.tradeId].stop = 2;

        // Create new history and tradeId for new owner to accept static offers
        listing memory newListing = listing(listVolume, _listing.account, 0, block.timestamp, 1, address(0));
        tradeId[listVolume] = newListing;
        history[_id][history[_id].length] = newListing;
        listVolume++;
        }
    // let admin revert just bids for a specific auction
    function adminClearAllBids(uint256 _tradeId) public admin noreentry { escrowRefund(_tradeId); }
    function escrowRefund(uint256 _tradeId) internal returns(bool success) {
        if(bids[_tradeId].length > 0) {
            for(uint256 i=0; i<bids[_tradeId].length; i++) {
                (success,) = bids[_tradeId][i].account.call{value: bids[_tradeId][i].amount}("");
                bids[_tradeId][i].amount = 0;
            }
        }
        }
    function sendNft(address _from, address _to, uint256 _id) internal {
        //bytes memory payload = abi.encodeWithSignature("safeTransferFrom(address, address, uint256)", _from, _to, _id);
        //(success,) = nftContract.call(payload);
        nftContract.approve(_to, _id);
        nftContract.safeTransferFrom(_from, _to, _id);
        }
    // bid on any NFT except: fixed price or in auction ended status
    function createBid(uint256 _id, uint256 _value) public payable {
        require(msg.value >= _value);
        listing memory _listing = history[_id][history[_id].length-1];
        require(_listing.stop < 2 || _listing.stop > block.timestamp, "Auction over");
        require(_listing.stop != 1, "Cannot bid on fixed prices");

        bid[] storage _bids = bids[_listing.tradeId];
        require(_bids.length < 1000, "Max bids 1000 per listing");

        uint256 i = findBid(_listing.tradeId);
        require(i != 1000, "An account bid already exists");
        _bids.push(bid(msg.sender, _value));
        escrow += _value;
        }
    // edit current bid (you can only have one bid)
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
    // cancel your bid altogether
    function cancelBid(uint256 _id) public payable {
        require(msg.value >= _value);
        listing memory _listing = history[_id][history[_id].length-1];
        require(_listing.stop < 2 || _listing.stop > block.timestamp, "Auction over");
        require(_listing.stop != 1, "Cannot bid on fixed prices");

        bid[] storage _bids = bids[_listing.tradeId];
        require(_bids.length < 1000, "Max bids 1000 per listing");

        uint256 i = findBid(_listing.tradeId, msg.sender);
        require(i != 1000, "An account bid already exists");
        _bids.push(bid(msg.sender, _value));
        escrow += _value;
        }
    // find list of active tradeIds
    function findBids(address _account) public view returns(uint256[] memory _tradeIds) {
        //uint256[] memory _bids = new uint256;
        uint256[] memory _bids = new uint256[](myBids[_account].length);
        uint256[] memory _indecies = new uint256[](myBids[_account].length);
        for(uint256 i; i< myBids[_account].length; i++) _bids[i] = myBids[_account][i];
        return _bids;
        }
    function findBid(uint256 _tradeId, address _account) public view returns(uint256) {
        for(uint256 i=1; i< bids[_tradeId].length; i++) { if(bids[_tradeId][i].account == _account) return i; }
        return 1000;
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
    


    

    function withdrawAll() public payable onlyOwner { require(payable(msg.sender).send(address(this).balance)); }
    // No tokens should be sent into the contract: burn / take them
    function burnRdnmTkn(address _token, address _to, uint256 _amount) external returns(bool success) { 
        bytes memory payload = abi.encodeWithSignature("transfer(address, uint256)", _to, _amount);
        (success,) = _token.call(payload);
        }
}
