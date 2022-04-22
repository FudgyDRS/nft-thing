import { FC } from "react";
import "./App.scss";

import Home from "./pages/Home";
import AdminNFT from "./pages/AdminNFT";
//import Configurations from "./pages/Configurations";
import {
  HashRouter,
  Route,
  Switch
} from "react-router-dom";



//import IpfsRouter from "ipfs-react-router";

// change sidebar to consume x height
// change footer to consume y height
// change Route to consume 100% - x - y height

const App: FC = () => {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/admin-nft" component={AdminNFT} exact></Route>
        </Switch> 
      </HashRouter>
    </> 
  );
}; 

export default App;
