import { FC, useEffect, useState } from 'react';
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers } from "../../modules/usedapp2/hooks";

import { ABI as abi, NFT as token } from '../../abi/nftFunctions';
import { ethers } from 'ethers';
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';

const MintButton: FC = () => {
  const [ singlePrice, setSinglePrice ] = useState("");

  const { account } = useEthers(); 
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(token, abi, signer);

  contract["calculatePrice"]()
    .then((r: any) => { const temp = isBigNumberish(r) && ethers.utils.formatUnits(r, 0); temp && setSinglePrice(temp);})
    .catch((e: any) => { console.log(e); });
  
  //useEffect(() => {}, [singlePrice])

  return account ? (
    <>
        <Button
          onClick={() => {contract.mintNFT( {value: singlePrice})}}
          background="gray"
          height="38px" width="140px"
          margin="1px"
          paddingInlineStart="3px" paddingInlineEnd="3px"
          border="1px" borderRadius="6px" borderStyle="solid" borderColor="transparent"
          _hover={{ border: "1px", borderRadius: "6px", borderStyle: "solid", backgroundColor: "blue" }}
        >
          <Text color={"white"} fontSize="1em"> Mint NFT </Text>
        </Button>
      <br />
      <Text color="green" fontSize="1em"> Ready to mint . . . </Text>
    </>
  ) : (
    <>
      <Box>
        <Button
          background="gray"
          height="38px" width="140px"
          margin="1px"
          paddingInlineStart="3px" paddingInlineEnd="3px"
          border="1px" borderRadius="6px" borderStyle="solid" borderColor="transparent"
          _hover={{ border: "1px", borderRadius: "6px", borderStyle: "solid", backgroundColor: "red" }}
        >
          <Text color="white" fontSize="1em"> Mint NFT </Text>
        </Button>
      </Box>
      <br />
      <Text color="red" fontSize="1em"> Connect wallet to mint . . . </Text>
    </>
  );
}

export default MintButton;
