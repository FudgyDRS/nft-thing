import { FC } from "react";
import BlockMintNFT from "../components/home/BlockMintNFT";
import BlockRecentMints from "../components/home/BlockRecentMints";

const Home: FC = () => {
  
    return (
      <>
        <BlockMintNFT />
        <BlockRecentMints />
      </>
    );
  };
  
  export default Home;
