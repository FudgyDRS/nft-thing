import { FC } from "react"
import styled from "styled-components";
import { Box } from "@chakra-ui/react"

// Coming Soon...
const Answer = styled.text`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: yellow;
  font-weight: 800;
  font-size: 2.5em;
`;

const BlockMarketplace: FC = () => {
  return (
        <Box>
        <Answer >Coming very soon!</Answer>
        </Box>
  )
}

export default BlockMarketplace;

// method to start auction
// method to start sale
// method to buy art
// method to offer buy art
// method to cancel auction
// method to cancel sale
// method to cancel offer
// method to see all current offers
// method to order auctions by ending soonest
// method to order sales by type, recent listed, price
// method to see all trade logs
// method to see all trade logs for specific NFT
// method to see all listing logs
