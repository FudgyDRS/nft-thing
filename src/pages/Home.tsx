import { FC } from "react";
import Countdown from "../components/Countdown";
import BlockMintNFT from "../components/home/BlockMintNFT";
import BlockRecentMints from "../components/home/BlockRecentMints";

const Home: FC = () => {

  //1648224000000
  //1647933422936
  console.log("Date: ", Date.now())
  console.log("Countdown: ", 1648224000000 - Date.now())
  
    return (
      <div className="default-dark">
        <Countdown />
        {/* <BlockMintNFT />
        <BlockRecentMints /> */}
      </div>
    );
  };
  
  export default Home;
