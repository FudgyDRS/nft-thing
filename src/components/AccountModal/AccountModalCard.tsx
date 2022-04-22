import { ApeObject as NFTObject } from "../../models/Rekt Apes/ApeObject";
import { Card, } from "react-bootstrap";
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import NftModal from "../NftModal";
import "@fontsource/inter";

interface Props { nftObject?: NFTObject; }
export function GenerateCard({ nftObject }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return nftObject ? (
    <>
      <Button onClick={onOpen} background="transparent" isActive={false}>
        <Card className="modal-card">
          <Card.Img variant="top" src={"https://fudgy.mypinata.cloud/ipfs/QmaHvkGj9ooAiDwDsVCdoUTbYqJfU5txQA8mR7xLYQwZKj/" + nftObject["edition"] + ".png"} />
          <div className="overlay"># {nftObject["edition"]}</div>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} nftObject={nftObject}/>
      </>
  ) : (<Box>{`${console.log("GenerateCard failed: ", nftObject)}`}</Box>);
}

