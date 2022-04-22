import { useState, useEffect } from "react";
import { ApeObject as NFTObject } from "../models/Rekt Apes/ApeObject";
import { Card, } from "react-bootstrap";
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import { ABI as abi, NFT as token } from '../abi/nftFunctions';
import { useEthers } from "../modules/usedapp2/hooks";

//import StatusCircle from "./StatusCircle";

import NftModal from "./NftModal";
import "@fontsource/inter";
import { ethers } from "ethers";

interface Props { nftObject?: NFTObject; } 
function GenerateCard({ nftObject }: Props) {
  const [ ownerOf, setOwnerOf ] = useState("");

  const { account } = useEthers(); 
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(token, abi, signer);

  
  useEffect(() => {
    account && nftObject && (contract["ownerOf(uint256)"](String(nftObject!["edition"])))
      .then((r: any) => { const temp = r; temp && setOwnerOf(temp);})
      .catch((e: any) => { console.log(e); });
    ownerOf ? setOwnerOf(ownerOf.slice(0, 6) + "..." + ownerOf.slice(ownerOf.length - 4, ownerOf.length)) : setOwnerOf("");
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure();
  //let ownerOf;
  //ownerOf = account ? OwnerOf(String(nftObject!["edition"])) : undefined;
  //ownerOf = ownerOf ? ownerOf.slice(0, 6) + "..." + ownerOf.slice(ownerOf.length - 4, ownerOf.length) : "";
  
  let fileExtension = nftObject!["edition"] == "3333" ? ".jpg" : ".png";
  return nftObject ? (
    <>
      <Button onClick={onOpen}>
        <Card className="generic-card">
          {/* <Card.Text className="card-status"><StatusCircle input={3}/></Card.Text> */}
          <Card.Img variant="top" src={"https://fudgy.mypinata.cloud/ipfs/QmaHvkGj9ooAiDwDsVCdoUTbYqJfU5txQA8mR7xLYQwZKj/" + nftObject["edition"] + fileExtension} />
          <Card.Body>
            <Card.Title>{nftObject.name}</Card.Title>
            <Card.Text color="black" >Owner:<br/>{ownerOf}</Card.Text>
          </Card.Body>
        </Card> 
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} nftObject={nftObject}/>
      </>
  ) : (<Box>{`${console.log("GenerateCard failed: ", nftObject)}`}</Box>);
}

export default GenerateCard;
