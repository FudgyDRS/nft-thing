import { SharkObject } from "../models/MTV Sharks/SharkObject";

import { Card, } from "react-bootstrap";

import { Box, } from '@chakra-ui/react';

import { OwnerOf, } from "../abi/mtvSharks";

import { useEthers } from "../modules/usedapp2/hooks";


interface Props { sharkObject?: SharkObject; }
function GenerateCard({sharkObject}: Props) {
    const { account } = useEthers();
    let ownerOf;
    ownerOf = account ? OwnerOf(String(sharkObject!["custom_fields"].edition-1)) : undefined;
    ownerOf = ownerOf ? ownerOf.slice(0, 6) + "..." + ownerOf.slice(ownerOf.length - 4, ownerOf.length) : "";
  return sharkObject ? (
    <Box>
      <Card style={{ width: '200px' }}>
        <Card.Img variant="top" src={require("../assets/compressed/" + sharkObject["custom_fields"].edition + ".png").default} />
        <Card.Body>
          <Card.Title>{sharkObject.name}</Card.Title>
          {/* <Card.Text color="black">Owner:<br/>{ownerOf.slice(0, 6)}...{ownerOf.slice(ownerOf.length - 4, ownerOf.length)}</Card.Text> */}
          <Card.Text color="black">Owner:<br/>{ownerOf}</Card.Text>
        </Card.Body>
      </Card>
    </Box>
  ) : (
    <Box>
      {`${console.log("GenerateCard failed: ", sharkObject)}`}
    </Box>
  );
}

export default GenerateCard;
