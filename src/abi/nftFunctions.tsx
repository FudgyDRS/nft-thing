import { Falsy } from "../modules/usedapp2/model/types";
//import { useContractCall } from "../modules/usedapp2/hooks";
import { useCall } from "../modules/usedapp2/hooks";

import interfaceAbi from "./nftAbi.json";

import { Contract, utils } from "ethers";

//BSC Test:
//export const NFT = "0x328B697bb7a660B3a3fEC1c0913F1A1DD3fC7Bd9";

// tCRO Test:
export const NFT = "0xaA7bb5855C88A5b95665BAadB99F04DeEe8E8de3"; 

/*const { value, error } = useCall({
  contract: new Contract(NFT, ABI),
  method: “balanceOf”,
  args: [address],
});*/
/*const { value, error } = useCall({
  contract: new Contract(tokenAddress, ERC20Interface),
  method: “balanceOf”,
  args: [address],
});*/
export const ABI = new utils.Interface(interfaceAbi);

export function Approve(to: string | Falsy, tokenId: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "approve", args: [to, tokenId] }) ?? []; return result; }
export function Burn(_amount: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "burn", args: [_amount] }) ?? []; return result; }
export function BurnRdnmTkn(_token: string | Falsy, _to: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "burnRdnmTkn", args: [_token, _to] }) ?? []; return result; }
export function MintMultipleNFT(_amount: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "mintMultipleNFT", args: [_amount] }) ?? []; return result; }
export function MintNFT() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "mintNFT", args: [] }) ?? []; return result; }
export function OwnershipTransferred(previousOwner: string | Falsy, newOwner: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "OwnershipTransferred", args: [previousOwner, newOwner] }) ?? []; return result; }
export function RenounceOwnership() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "renounceOwnership", args: [] }) ?? []; return result; }
export function ReserveGiveaway(_amount: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "reserveGiveaway", args: [_amount] }) ?? []; return result; }
export function SafeTransferFrom(from: string | Falsy, to: string | Falsy, tokenId: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "safeTransferFrom", args: [from, to, tokenId] }) ?? []; return result; }
export function SafeTransferFrom2(from: string | Falsy, to: string | Falsy, tokenId: string | Falsy, _data: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "safeTransferFrom", args: [from, to, tokenId, _data] }) ?? []; return result; }
export function SetApprovalForAll(operator: string | Falsy, approved: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "setApprovalForAll", args: [operator, approved] }) ?? []; return result; }
export function SetBaseURI(baseURI: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "setBaseURI", args: [baseURI] }) ?? []; return result; }
export function SetTokenReceiver(_new: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "setTokenReceiver", args: [_new] }) ?? []; return result; }
export function ToggleSale() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "toggleSale", args: [] }) ?? []; return result; }
export function Transfer(from: string | Falsy, to: string | Falsy, tokenId: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "Transfer", args: [from, to, tokenId] }) ?? []; return result; }
export function TransferFrom(from: string | Falsy, to: string | Falsy, tokenId: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "transferFrom", args: [from, to, tokenId] }) ?? []; return result; }
export function TransferOwnership(newOwner: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "transferOwnership", args: [newOwner] }) ?? []; return result; }
export function WithdrawAll() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "withdrawAll", args: [] }) ?? []; return result; }
export function BalanceOf(owner: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "balanceOf", args: [owner] }) ?? []; return result; }
export function BaseURI() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "baseURI", args: [] }) ?? []; return result; }
export function CalculatePrice() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "calculatePrice", args: [] }) ?? []; return result; }
export function CalculatePriceMultiple(_amount: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "calculatePriceMultiple", args: [_amount] }) ?? []; return result; }
export function CurrentSupply() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "currentSupply", args: [] }) ?? []; return result; }
export function GetApproved(tokenId: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "getApproved", args: [tokenId] }) ?? []; return result; }
export function IsApprovedForAll(owner: string | Falsy, operator: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "isApprovedForAll", args: [owner, operator] }) ?? []; return result; }
export function IsSaleEnabled() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "isSaleEnabled", args: [] }) ?? []; return result; }
export function MaxSupply() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "maxSupply", args: [] }) ?? []; return result; }
export function Name() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "name", args: [] }) ?? []; return result; }
export function Owner() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "owner", args: [] }) ?? []; return result; }
export function OwnerOf(tokenId: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "ownerOf", args: [tokenId] }) ?? []; return result; }
export function Receiver() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "receiver", args: [] }) ?? []; return result; }
export function SupportsInterface(interfaceId: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "supportsInterface", args: [interfaceId] }) ?? []; return result; }
export function Symbol() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "symbol", args: [] }) ?? []; return result; }
export function TokenByIndex(index: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "tokenByIndex", args: [index] }) ?? []; return result; }
export function TokenOfOwnerByIndex(owner: string | Falsy, index: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "tokenOfOwnerByIndex", args: [owner, index] }) ?? []; return result; }
export function TokensOfOwner(_owner: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "tokensOfOwner", args: [_owner] }) ?? []; return result; }
export function TokenURI(tokenId: string | Falsy) {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "tokenURI", args: [tokenId] }) ?? []; return result; }
export function TotalSupply() {
    const [result]: any = useCall({ contract: new Contract(NFT, ABI), method: "totalSupply", args: [] }) ?? []; return result; }
