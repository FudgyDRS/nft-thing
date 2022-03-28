import { SharkObject } from "../../models/MTV Sharks/SharkObject";
import { Card, } from "react-bootstrap";
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import NftModal from "../NftModal";
import "@fontsource/inter";

interface Props { sharkObject?: SharkObject; }
export function GenerateCard({sharkObject}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let fileExtension = sharkObject!["custom_fields"].edition == "3333" ? ".jpg" : ".png";

  return sharkObject ? (
    <>
      <Button onClick={onOpen} background="transparent" isActive={false}>
        <Card className="modal-card">
          <Card.Img variant="top" src={"https://mtvsharks.s3.us-west-1.amazonaws.com/" + sharkObject["custom_fields"].edition + fileExtension} />
          <div className="overlay"># {sharkObject["custom_fields"].edition}</div>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject}/>
      </>
  ) : (<Box>{`${console.log("GenerateCard failed: ", sharkObject)}`}</Box>);
}

