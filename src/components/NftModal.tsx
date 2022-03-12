import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Card, CardGroup } from "react-bootstrap";
import styled from "styled-components";

import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  extendTheme,
  ChakraProvider,
  Image
} from "@chakra-ui/react";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";

import { SharkObject } from "../models/MTV Sharks/SharkObject";
import Identicon from "../Identicon";
import { useEthers } from "../modules/usedapp2/hooks";
import StatusCircle from "./StatusCircle";

// image
// status block
// tabs: Image (option goes away on desktop) / Data / History
// Data Block / History Block
// Buttons Block: disable buttons that aren't useable (all disabled by default)

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          maxWidth: ["80%", "80%", "80%"],
          minWidth: "95%",
          maxHeight: ["80%", "80%", "80%"],
          minHeight: "95%",
          bg: "#00ff00"
        }
      })
    }
  }
});

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

type Props = { isOpen: any; onClose: any; sharkObject: SharkObject; };
export default function NftModal({ isOpen, onClose, sharkObject }: Props) {
  console.log("modal did something");
  const [, setValue] = useState("");

  const { account} = useEthers();
  return (
    <ChakraProvider theme={theme}>
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium"> {sharkObject.name} </ModalHeader>
        <Header>
          <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">Status: <StatusCircle input={4} /></ModalHeader>
        </Header>
        <ModalCloseButton
          color="white"
          fontSize="sm"
          _hover={{ color: "whiteAlpha.700" }}
        />
        <Header>
        <ModalBody pt={0} px={4}>
          <Box borderRadius="3xl" border="1px" borderStyle="solid" borderColor="gray.600" px={5} pt={4} pb={2} mb={3} >
            <Image src={"https://fudgy.mypinata.cloud/ipfs/QmWHBp5ogVWWugkCpBqLT8MygNr9ZJCXJfQi4oYWMqRR3W/" + String(sharkObject!["custom_fields"].edition-1) + ".png"} alt="MTV Sharks Club" />
          </Box>
          </ModalBody>
        <ModalBody pt={0} px={4}>
          <Box borderRadius="3xl" border="1px" borderStyle="solid" borderColor="gray.600" px={5} pt={4} pb={2} mb={3} >
            
            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
            <Text color="white">Owner: </Text>
              <Text color="white" fontSize="xl" fontWeight="semibold" ml="2" lineHeight="1.1">
                {account && `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`}
              </Text>
              <Link
                fontSize="sm"
                display="flex"
                alignItems="center"
                href={`https://e.mtv.ac/account.html?address=${account}`}
                isExternal
                color="gray.400"
                ml={6}
                _hover={{ color: "whiteAlpha.800", textDecoration: "underline" }}
              >
                <ExternalLinkIcon mr={1} />
              </Link>
            </Flex>
            <Text color="white" fontSize="xl" fontWeight="semibold" ml="2" lineHeight="1.1">Metadata:</Text>
            <Text color="white" fontSize="l" fontWeight="semibold" ml="2" lineHeight="1.1">Generation in progress . . .</Text>
          </Box>
        </ModalBody>
          </Header>
          <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium"> Transaction History: </ModalHeader>
        {/* <ModalFooter justifyContent="end" background="gray.700" borderBottomLeftRadius="3xl" borderBottomRightRadius="3xl" p={6} ><Text></Text></ModalFooter> */}
      </ModalContent>
    </Modal>
    </ChakraProvider>
  );
}
