import { FC, useState, useEffect } from "react";
import { formatUnits } from "@ethersproject/units";
import { Box, Text, Button } from '@chakra-ui/react';
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

import { useEthers } from "../../modules/usedapp2/hooks";
import { TotalSupply, CalculatePrice, CalculatePriceMultiple, MaxSupply } from '../../abi/nftFunctions';
import MintButton from "./MintButton";

import { ethers, BigNumber } from "ethers";
import { formatEther } from "@ethersproject/units";
import { NFT as token, ABI as abi } from "../../abi/nftFunctions";

import "../../styles/mintBlock.scss";

const BlockMintMultipleNFT: FC = () => {
  const [inputValue, setInputValue] = useState(1);
  const [price, setPrice] = useState(0);

//contract["safeTransferFrom(address,address,uint256)"](_from, _to, _id)
  const { account } = useEthers();

  


  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(token, abi, signer);

  

  const totalSupply = TotalSupply();
  //const maxSupply = MaxSupply();
  const singlePrice = CalculatePrice();
  
  // const multiplePrice = CalculatePriceMultiple(String(inputValue));
  // const totalSupply = contract["totalSupply()"];
  const maxSupply_ = contract["maxSupply"]();
  const maxSupply = formatUnits(maxSupply_, 0);
  //console.log("maxSupply: ", maxSupply);
  // const singlePrice = contract["calculatePrice()"];
  const multiplePrice = contract["calculatePriceMultiple(uint256)"](inputValue);

  //const temp = contract["calculatePriceMultiple(uint256)"](inputValue);
  //setPrice(temp && formatUnits(temp, 0));

  const Incrementer: FC = () => {
    return (<>
      <Button
        variant="link"
        color="gray.400" 
        fontWeight="normal"
        fontSize="sm"
        onClick={() => { setInputValue(inputValue + 1); }}
        _hover={{ textDecoration: "none", color: "whiteAlpha.800" }}
      >
        <BiUpArrow width={"15px"} />
      </Button>
    </>)
  }

  const Decrementer: FC = () => {
    return (<>
      <Button
        variant="link"
        color="gray.400"
        fontWeight="normal"
        fontSize="sm"
        onClick={() => { if(inputValue > 0) setInputValue(inputValue - 1); }}
        _hover={{ textDecoration: "none", color: "whiteAlpha.800" }}
      >
        <BiDownArrow width={"15px"} />
      </Button>
    </>)
  }

  function GeneratePrice() {
    const temp = account ? inputValue > 1 ? multiplePrice : singlePrice : 0;
    const intPrice = inputValue != 0 ? temp && formatUnits(temp, 18) : 0;
    console.log("current price: ", intPrice);
    setPrice(intPrice);
  }

  useEffect(() => { 
    GeneratePrice();
  }, [singlePrice, multiplePrice, totalSupply, maxSupply])
    

  return (
    <Box>
      <div className="mint-box">
        <div className="price-box">
          <Text>{totalSupply && formatUnits(totalSupply, 0)} / {maxSupply && formatUnits(maxSupply, 0)} Minted</Text>
          <Text>Mint Cost: </Text>
          <Text>~{price} CRO</Text>
        </div>
        <div className="input-box">
          <Incrementer />
            <input className="quantity" value={inputValue} onChange={GeneratePrice}/>
          <Decrementer />
        </div>
        <div className="mint-button-box">
            <MintButton />
        </div>
      </div>
    </Box>
  )
}

export default BlockMintMultipleNFT;
