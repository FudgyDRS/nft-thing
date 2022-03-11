//import { Button, Box, Text } from "@chakra-ui/react";
//import { useEthers, useEtherBalance } from "@usedapp/core";
import styled from "styled-components";
import { FC } from "react";

const FooterDefault = styled.div`
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(15px);
  color: white;
  position: fixed;
  bottom: 0px;
`;

// add footer socials

const MyCollectionBlock: FC = () => {
  return (
    <>
      <FooterDefault className="footer">MTV Sharks</FooterDefault>
    </>
  );
};

export default MyCollectionBlock;
