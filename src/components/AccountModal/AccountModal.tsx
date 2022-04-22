import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';

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

import { ABI as abi, NFT as token } from '../../abi/nftFunctions';
import Identicon              from "./Identicon";
import { useEthers }         from "../../modules/usedapp2/hooks";
import AccountModalCollection from "./AccountModalCollection"; 
import { ethers } from "ethers";

type Props = { isOpen: any; onClose: any; };
export default function AccountModal({ isOpen, onClose }: Props) {
  const [, setValue] = useState("");
  const [ balanceOf, setBalanceOf ] = useState("");

  const { account, deactivate } = useEthers();
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(token, abi, signer);

  contract["balanceOf(address)"](account)
    .then((r: any) => { const temp = isBigNumberish(r) && ethers.utils.formatUnits(r, 0); temp && setBalanceOf(temp);})
    .catch((e: any) => { console.log(e); });

  useEffect(() => {}, [contract])

  function handleDeactivateAccount() {
    deactivate();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent background="gray.900" border="1px" borderStyle="solid" borderColor="gray.700" borderRadius="3xl" marginTop="220px">
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium"> Account </ModalHeader>
        <ModalCloseButton color="white" fontSize="sm" _hover={{ color: "whiteAlpha.700" }} />
        <ModalBody pt={0} px={4}>
          <Box borderRadius="3xl" border="1px" borderStyle="solid" borderColor="gray.600" px={5} pt={4} pb={2} mb={3} >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm"> Connected with MetaMask </Text>
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
                onClick={handleDeactivateAccount}
              > Change </Button>
            </Flex>
            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
              <Identicon />
              <Text color="white" fontSize="xl" fontWeight="semibold" ml="2" lineHeight="1.1"> 
                {account && `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`}
              </Text>
            </Flex>
            <Flex alignContent="center" m={3}>
              <CopyToClipboard text={`${account}`} onCopy={() => setValue(`${account}`)}>
                <Button
                  variant="link"
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  _hover={{ textDecoration: "none", color: "whiteAlpha.800" }}
                >
                  <CopyIcon mr={1} />
                  Copy Address
                </Button>
              </CopyToClipboard>
              <Link
                fontSize="sm"
                display="flex"
                alignItems="center"
                href={`https://cronos.org/explorer/address/${account}`}
                isExternal
                color="gray.400"
                ml={6}
                _hover={{ color: "whiteAlpha.800", textDecoration: "underline" }}
              >
                <ExternalLinkIcon mr={1} />
                View on Explorer
              </Link>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter 
          justifyContent="end"
          background="gray.700"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
          height="600px"
          padding= "10px"
        >
          <Grid className="modal-footer">
          <div className="modal-footer-balance">Balance: {balanceOf}</div>
        <AccountModalCollection balance={parseInt(balanceOf)}/>
        </Grid>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
