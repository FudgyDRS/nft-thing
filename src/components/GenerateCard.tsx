import { SharkObject } from "../models/MTV Sharks/SharkObject";
import { Card, } from "react-bootstrap";
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import { OwnerOf, } from "../abi/mtvSharks";
import { useEthers } from "../modules/usedapp2/hooks";

import StatusCircle from "./StatusCircle";
// import market functions

import NftModal from "./NftModal";
import "@fontsource/inter";
//compressed0001-0500

function GetDirectory(input: any) {
  const v = Number(input);
  return v <= 500 ? "../assets/compressed0001-0500/"
  : v > 500  ?      "../assets/compressed0501-1000/"
  : v > 1000 ?      "../assets/compressed1001-1500/"
  : v > 1500 ?      "../assets/compressed1501-2000/"
  : v > 2000 ?      "../assets/compressed2001-2500/"
  : v > 2500 ?      "../assets/compressed2501-3000/"
  : v > 3000 ?      "../assets/compressed3001-3500/"
  : v > 3500 ?      "../assets/compressed3501-4000/"
  :                 "undefined"

} // GetDirectory(sharkObject["custom_fields"].edition)

interface Props { sharkObject?: SharkObject; }
function GenerateCard({sharkObject}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { account } = useEthers();
  let ownerOf;
  ownerOf = account ? OwnerOf(String(sharkObject!["custom_fields"].edition-1)) : undefined;
  ownerOf = ownerOf ? ownerOf.slice(0, 6) + "..." + ownerOf.slice(ownerOf.length - 4, ownerOf.length) : "";
  const v = sharkObject ? Number(sharkObject["custom_fields"].edition) : 1;
  return sharkObject ? v <= 500 ? (
    <>
      <Button onClick={onOpen}>
        <Card className="generic-card" style={{ width: '200px' }}>
          <Card.Text className="card-status"><StatusCircle input={1}/></Card.Text>
          <Card.Img variant="top" src={require("../assets/compressed0001-0500/" + sharkObject["custom_fields"].edition + ".png").default} />
          <Card.Body>
            <Card.Title>{sharkObject.name}</Card.Title>
            <Card.Text color="black" >Owner:<br/>{ownerOf}</Card.Text>
          </Card.Body>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject}/>
      </>
  ) : v > 500 ? (
    <>
      <Button onClick={onOpen}>
        <Card className="generic-card" style={{ width: '200px' }}>
          <Card.Text className="card-status"><StatusCircle input={1}/></Card.Text>
          <Card.Img variant="top" src={require("../assets/compressed0501-1000/" + sharkObject["custom_fields"].edition + ".png").default} />
          <Card.Body>
            <Card.Title>{sharkObject.name}</Card.Title>
            <Card.Text color="black" >Owner:<br/>{ownerOf}</Card.Text>
          </Card.Body>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject}/>
      </>
  ) : v > 1000 ? (
    <>
      <Button onClick={onOpen}>
        <Card className="generic-card" style={{ width: '200px' }}>
          <Card.Text className="card-status"><StatusCircle input={1}/></Card.Text>
          <Card.Img variant="top" src={require("../assets/compressed1001-1500/" + sharkObject["custom_fields"].edition + ".png").default} />
          <Card.Body>
            <Card.Title>{sharkObject.name}</Card.Title>
            <Card.Text color="black" >Owner:<br/>{ownerOf}</Card.Text>
          </Card.Body>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject}/>
      </>
  ) : v > 1500 ? (
    <>
      <Button onClick={onOpen}>
        <Card className="generic-card" style={{ width: '200px' }}>
          <Card.Text className="card-status"><StatusCircle input={1}/></Card.Text>
          <Card.Img variant="top" src={require("../assets/compressed1501-2000/" + sharkObject["custom_fields"].edition + ".png").default} />
          <Card.Body>
            <Card.Title>{sharkObject.name}</Card.Title>
            <Card.Text color="black" >Owner:<br/>{ownerOf}</Card.Text>
          </Card.Body>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject}/>
      </>
  ) : v > 2000 ? (
    <>
      <Button onClick={onOpen}>
        <Card className="generic-card" style={{ width: '200px' }}>
          <Card.Text className="card-status"><StatusCircle input={1}/></Card.Text>
          <Card.Img variant="top" src={require("../assets/compressed2001-2500/" + sharkObject["custom_fields"].edition + ".png").default} />
          <Card.Body>
            <Card.Title>{sharkObject.name}</Card.Title>
            <Card.Text color="black" >Owner:<br/>{ownerOf}</Card.Text>
          </Card.Body>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject}/>
      </>
  ) : v > 2500 ? (
    <>
      <Button onClick={onOpen}>
        <Card className="generic-card" style={{ width: '200px' }}>
          <Card.Text className="card-status"><StatusCircle input={1}/></Card.Text>
          <Card.Img variant="top" src={require("../assets/compressed2501-3000/" + sharkObject["custom_fields"].edition + ".png").default} />
          <Card.Body>
            <Card.Title>{sharkObject.name}</Card.Title>
            <Card.Text color="black" >Owner:<br/>{ownerOf}</Card.Text>
          </Card.Body>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject}/>
      </>
  ) : v > 3000 ? (
    <>
      <Button onClick={onOpen}>
        <Card className="generic-card" style={{ width: '200px' }}>
          <Card.Text className="card-status"><StatusCircle input={1}/></Card.Text>
          <Card.Img variant="top" src={require("../assets/compressed3001-3500/" + sharkObject["custom_fields"].edition + ".png").default} />
          <Card.Body>
            <Card.Title>{sharkObject.name}</Card.Title>
            <Card.Text color="black" >Owner:<br/>{ownerOf}</Card.Text>
          </Card.Body>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject}/>
      </>
  ) : (
    <Box>{`${console.log("GenerateCard failed: ", sharkObject)}`}</Box>
  ) : (
    <Box>{`${console.log("GenerateCard failed: ", sharkObject)}`}</Box>
  );
}

export default GenerateCard;

/*
  : v > 500  ?      "../assets/compressed0501-1000/" + sharkObject["custom_fields"].edition + ".png"
  : v > 1000 ?      "../assets/compressed1001-1500/" + sharkObject["custom_fields"].edition + ".png"
  : v > 1500 ?      "../assets/compressed1501-2000/" + sharkObject["custom_fields"].edition + ".png"
  : v > 2000 ?      "../assets/compressed2001-2500/" + sharkObject["custom_fields"].edition + ".png"
  : v > 2500 ?      "../assets/compressed2501-3000/" + sharkObject["custom_fields"].edition + ".png"
  : v > 3000 ?      "../assets/compressed3001-3500/" + sharkObject["custom_fields"].edition + ".png"
  : v > 3500 ?      "../assets/compressed3501-4000/" + sharkObject["custom_fields"].edition + ".png"
  :                 "../assets/compressed0001-0500/1.png"
  */
