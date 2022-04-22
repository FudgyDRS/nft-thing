import { useEffect, useState } from "react";

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
  Grid
} from "@chakra-ui/react";

//import { useEthers2 } from "../../modules/usedapp2/hooks";
import { useEthers } from "../../modules/usedapp2/hooks";

type Props = { isOpen: any; onClose: any; };
export default function SelectorModal({ isOpen, onClose }: Props) {
  const [walletType, setWalletType] = useState("");
  const { activateBrowserWallet } = useEthers();

  function handleConnectWallet() {
    activateBrowserWallet();
    onClose();
  }

useEffect(() => {
    activateBrowserWallet();
    onClose();
}, [walletType]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent background="gray.900" border="1px" borderStyle="solid" borderColor="gray.700" borderRadius="3xl" >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium"> Connect a wallet: </ModalHeader>
        <ModalCloseButton color="white" fontSize="sm" _hover={{ color: "whiteAlpha.700" }} />
        <ModalBody pt={0} px={4}>
          <Box borderRadius="3xl" border="1px" borderStyle="solid" borderColor="gray.600" px={5} pt={4} pb={2} mb={3} >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Button
                variant="outline"
                size="sm"
                borderColor="blue.800"
                borderRadius="3xl"
                color="blue.500"
                fontSize="13px"
                fontWeight="normal"
                px={2}
                height="26px"
                _hover={{ background: "none", borderColor: "blue.300", textDecoration: "underline" }}
                onClick={() => { setWalletType("MetaMask"); }}
              > Metamask </Button>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Button
                variant="outline"
                size="sm"
                borderColor="blue.800"
                borderRadius="3xl"
                color="blue.500"
                fontSize="13px"
                fontWeight="normal"
                px={2}
                height="26px"
                _hover={{ background: "none", borderColor: "blue.300", textDecoration: "underline" }}
                onClick={() => { setWalletType("DeFiConnect"); }}
              > Crypto.com DeFi Connect </Button>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Button
                variant="outline"
                size="sm"
                borderColor="blue.800"
                borderRadius="3xl"
                color="blue.500"
                fontSize="13px"
                fontWeight="normal"
                px={2}
                height="26px"
                _hover={{ background: "none", borderColor: "blue.300", textDecoration: "underline" }}
                onClick={() => { setWalletType("WalletConnect"); }}
              > Wallet Connect </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
