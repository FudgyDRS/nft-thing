import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";

import { SharkObject } from "../../models/MTV Sharks/SharkObject";
import { Bid } from "../../models/marketplace/bid";
import { Listing } from "../../models/marketplace/listing";
import { useEthers } from "../../modules/usedapp2/hooks";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { ChakraProvider } from '@chakra-ui/react'
import BlockTransfer from "./BlockTransfer";

// Coming Soon
const Answer = styled.text`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: yellow;
  font-weight: 800;
  font-size: 2.5em;
`;
// struct listing { uint256 tradeId; address account; uint256 value; uint256 start; uint256 stop; address to; } // id == tradeId, not nftId
//     mapping(uint256 => listing[]) history;  // specific NFT's history, also indicates current status
//     mapping(uint256 => listing) tradeId;     // iterator for ALL trades
//     mapping(uint256 => uint256) sent;       // iterator for ALL sends

async function StartSale      (token: String, tokenId: String, price: any) {}
async function StartAuction   (token: String, tokenId: String, price: any) {}

async function CancelSale     (token: String, tokenId: String) {}
async function CancelAuction  (token: String, tokenId: String) {}
async function CancelOffer    (token: String, tokenId: String) {}

async function BuyToken       (token: String, tokenId: String, object: Listing) {}
async function CreateListing  () {}
async function CreateBid      (token: String, tokenId: String, object: Bid) {}
async function CreateCounter  (token: String, tokenId: String, object: Bid) {}

// Tabs: Ongoing / Complete / All
const BlockMarketplace: FC = () => {
  const [ listings,  setListings ] = useState<Listing[]>  ([]);
  const [ trades,    setTrades   ] = useState<Listing[]>  ([]);
  const [ history,   setHistory  ] = useState<Listing[]>  ([]);
  const [ bids,      setBids     ] = useState<Bid[]>      ([]);

  const { account } = useEthers();
  const listTotal = 0;      // ListVolume();
  const tradeTotal = 0;     // Volume();
  const bidsTotal = 0;      // Bids();
  const myBidsTotal = 0;    // MyBids();
  const totalSupply = 0;    // NFT: MyBids();

  // notice log:
  // Sale Complete (Complete tx), Auction results, Offer accepted, Outbid, New Offer

  // sort filters (check box):
  // Auctions, Sales, Accepting Offers, Completed Trades

  // maybe seperate contracts for account history and completed trades notices
  // Modifiable:
  //  Listings
  //  Bids
  // Pushable + Readable:
  //  History
  //  Tx history

  useEffect(() => {}, [])
  let gg = true;
  return account && gg
    ? (<Box marginTop={"80px"}><ChakraProvider>
      <BlockTransfer/>
      <Tabs variant='enclosed' colorScheme='green' paddingTop="80px">
        <TabList>
          <Tab>Active Auctions</Tab>
          <Tab>Active Sales</Tab>
          <Tab>All NFTs</Tab>
          <Tab>Unavalible</Tab>
          <Tab>History</Tab>
        </TabList>
      
        <TabPanels>
          <TabPanel><p>Coming soon!</p></TabPanel>
          <TabPanel><p>Coming soon!</p></TabPanel>
          <TabPanel><p>Coming soon!</p></TabPanel>
          <TabPanel><p>Coming soon!</p></TabPanel>
          <TabPanel><p>Coming soon!</p></TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider></Box>) 
    : (<ChakraProvider><Answer >Coming very soon!</Answer></ChakraProvider>)
}

export default BlockMarketplace;

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
