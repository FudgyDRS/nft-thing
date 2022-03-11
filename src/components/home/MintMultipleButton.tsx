import { Button, Box, Text } from "@chakra-ui/react";

import { useEthers } from "../../modules/usedapp2/hooks";
import { MintMultipleNFT, } from '../../abi/mtvSharks';

type Props = { amount: any};
export default function MintMultipleButton({ amount }: Props) {
  const { account } = useEthers();

  function testClick() {}

  // function mintFunction() {
  //   const result = MintMultipleNFT(amount);
  //   console.log("mint result: ", result);
  //   console.log(account);
  // }

//   useEffect(() => {
//     if (latestTx != null) {
//         window.web3.eth.getTransactionReceipt(latestTx, function (error, result) {
//           if (error) {
//             $(".Loading").hide();
//             console.error ('Error1::::', error);
//           }
//           console.log(result);
//           if(result != null){
//             latestTx = null;
//             $(".Loading").hide();
//           }
//         });
//       }
//   }, [])

  return account ? (
    <>
      <Box width="142px" background="gray" borderRadius={"6px"} py="0">
        <Button
          onClick={MintMultipleNFT(amount)}
          bg="gray.800"
          border="1px solid transparent"
          _hover={{ border: "1px", borderRadius: "10px", borderStyle: "solid", backgroundColor: "blue" }}
          m="1px"
          px={3}
          height="38px"
          width="140px"
        >
          <Box px="3"><Text color="white" fontSize="md"> Mint NFT(s) </Text></Box>
        </Button>
      </Box>
      <br />
      <Text color="green" fontSize="md"> Ready to mint . . . </Text>
    </>
  ) : (
    <>
      <Box width="142px" background="red" borderRadius={"6px"} py="0">
        <Button
          onClick={testClick}
          bg="gray"
          border="1px solid transparent"
          _hover={{ border: "1px", borderRadius: "10px", borderStyle: "solid", backgroundColor: "red" }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
          width="140px"
        >
          <Box px="3"><Text color="white" fontSize="md"> Mint NFT(s) </Text></Box>
        </Button>
      </Box>
      <br />
      <Text color="red" fontSize="md"> Connect MTV wallet to mint . . . </Text>
    </>
  );
}
