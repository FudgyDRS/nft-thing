import { FC, useEffect, useState, useRef, useCallback } from 'react';
import { Button, Box, Text, Input } from "@chakra-ui/react";
import { useEthers } from "../../modules/usedapp2/hooks";

import { 
    TotalSupply, 
    MintMultipleNFT,
    MintNFT,
    BalanceOf,
    CalculatePrice,
    CalculatePriceMultiple,
    CurrentSupply,
    TokenByIndex,
    TokenOfOwnerByIndex,
    TokensOfOwner,
    ABI, NFT
  } from '../../abi/mtvSharks';
import { ethers } from 'ethers';
import { formatUnits } from '@ethersproject/units';

//type Props = { account: any};

const MintButton: FC = () => {

  const { account } = useEthers();

  const temp = CalculatePrice();
  const price = temp && formatUnits(temp, 0);
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const token = NFT;
  const abi = ABI;
  const contract = new ethers.Contract(token, abi, signer);
  //const option = {value: ethers.utils.parseEther(String(price*10**18))};
  

  function testClick() { console.log(account); }

  useEffect(() => {
  }, [price])

  return account ? (
    <>
      <Box width="142px" background="gray" borderRadius={"6px"} py="0">
        <Button
          onClick={() => {contract.mintNFT( {value: temp})}}
          bg="gray.800"
          border="1px solid transparent"
          _hover={{ border: "1px", borderRadius: "10px", borderStyle: "solid", backgroundColor: "blue" }}
          m="1px"
          px={3}
          height="38px"
          width="140px"
        >
          <Box px="3"><Text color="white" fontSize="md"> Mint NFT(s) </Text></Box>
        </Button>
      </Box>
      <br />
      <Text color="green" fontSize="md"> Ready to mint . . . </Text>
    </>
  ) : (
    <>
      <Box width="142px" background="red" borderRadius={"6px"} py="0">
        <Button
          onClick={testClick}
          bg="gray"
          border="1px solid transparent"
          _hover={{ border: "1px", borderRadius: "10px", borderStyle: "solid", backgroundColor: "red" }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
          width="140px"
        >
          <Box px="3"><Text color="white" fontSize="md"> Mint NFT(s) </Text></Box>
        </Button>
      </Box>
      <br />
      <Text color="red" fontSize="md"> Connect MTV wallet to mint . . . </Text>
    </>
  );
}

export default MintButton;
