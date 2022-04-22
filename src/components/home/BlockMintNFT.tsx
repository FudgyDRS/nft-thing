import { FC, useEffect, useState } from "react";
import { Box, Text } from '@chakra-ui/react';
import { ethers } from "ethers";
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';

import { useEthers } from "../../modules/usedapp2/hooks";
import MintButton from "./MintButton";
import { ABI as abi, NFT as token } from '../../abi/nftFunctions';

import "../../styles/mintBlock.scss";

const BlockMintNFT: FC = () => {
  const [ totalSupply, setTotalSupply ] = useState("");
  const [ maxSupply, setMaxSupply ] = useState("");
  const [ singlePrice, setSinglePrice ] = useState("");

  const { account } = useEthers(); 
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(token, abi, signer);

  contract["totalSupply"]()
    .then((r: any) => { const temp = isBigNumberish(r) && ethers.utils.formatUnits(r, 0); temp && setTotalSupply(temp);})
    .catch((e: any) => { console.log(e); });
  contract["maxSupply"]()
    .then((r: any) => { const temp = isBigNumberish(r) && ethers.utils.formatUnits(r, 0); temp && setMaxSupply(temp);})
    .catch((e: any) => { console.log(e); });
  contract["calculatePrice"]()
    .then((r: any) => { const temp = isBigNumberish(r) && ethers.utils.formatUnits(r, 18); temp && setSinglePrice(temp);})
    .catch((e: any) => { console.log(e); });

  useEffect(() => {}, [singlePrice, totalSupply, maxSupply])
    
  return account ? (
    <Box>
      <div className="mint-box">
        <div className="price-box">
          <Text>{totalSupply} / {maxSupply} Minted</Text>
          <Text>Cost to mint: </Text>
          <Text>~{singlePrice} CRO</Text>
        </div>
        <div className="mint-button-box"><MintButton /></div>
      </div>
    </Box>
  ) : (
    <Box><Text>Connect your wallet to mint...</Text></Box>
  )
}

export default BlockMintNFT;
