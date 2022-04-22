import { FC, useState, useEffect } from "react";
import { Box, Heading, Text, } from '@chakra-ui/react';
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';

import { useEthers } from "../../modules/usedapp2/hooks";
import { ApeObject as NFTObject } from "../../models/Rekt Apes/ApeObject";
import { ABI as abi, NFT as token } from '../../abi/nftFunctions';
import metadata from '../../abi/metadata.json';
import PaginationComponent from '../PaginationComponent';
import { ethers } from "ethers";

const BlockRecentMints: FC = () => {
  const [ totalSupply, setTotalSupply ] = useState("");

  const { account } = useEthers(); 
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(token, abi, signer);

  
 
  const [data, setData] = useState<NFTObject[]>([]);
 
  function MakeArray(data: NFTObject[], totalMinted: any) {
    let newArray: NFTObject[] = [];
    for(let index=0; index<totalMinted; index++) { newArray = [data[index]].concat(newArray)}
    return newArray;
  }
   
  function RecentMints(totalSupply: any) {
    const nftList: any = metadata;
    const objects: NFTObject[] = nftList;
    const totalMinted = totalSupply && parseInt(totalSupply);
    setData(MakeArray(objects, totalMinted));
  };
  
  useEffect(() => { 
    RecentMints(totalSupply);
    contract["totalSupply"]()
      .then((r: any) => { const temp = isBigNumberish(r) && ethers.utils.formatUnits(r, 0); temp && setTotalSupply(temp);})
      .catch((e: any) => { console.log(e); });
   }, [totalSupply])
  
  if(account) {
    if(data.length!=0) { 
      return(<>
        <Heading>Recent Mints: </Heading>
        <PaginationComponent nftObjects = {data}/>
      </>)
    } else{ return (<><Text>Error: Data could not be loaded...</Text></>)}
  } else {
    return(<><Box>
      <Heading>Recent Mints (nope): </Heading>
      <Text>You need to connect you wallet to view recent mints...</Text>
    </Box></>)}
}

export default BlockRecentMints;



/*
//fetch("https://fudgy.mypinata.cloud/ipfs/QmXsHcHvrBWoRLb3jcqyuEUuxEaD8RumpFMxBsdNSnK3MW/_metadata.json")
      //.then(response2 => {
        //console.log("inside NFT response: ", response2.json()+"]");
        //let myData = response.json();
        
        /*response2.json()
          .then(response => {
            console.log("inside of all");
            console.log("newObject: ", response);
          }).catch(error => { console.log(error); });*/
        /*
        response2.json()
          .then(response => {
            for(var object of response) {
              
            
            setData([...data, {
              attributes: {
                Background: object["attributes"]["Background"],
                Color:      object["attributes"]["Color"],
                Spots:      object["attributes"]["Spots"],
                Base:       object["attributes"]["Base"],
                Eyes:       object["attributes"]["Eyes"],
                Eyebrow:    object["attributes"]["Eyebrow"],
                Mouth:      object["attributes"]["Mouth"],
                Nose:       object["attributes"]["Nose Area"],
                Head:       object["attributes"]["Head"],
                Wrist:      object["attributes"]["Wrist"]
              },
              custom_fields: { 
                compiler:   object["custom_fields"]["compiler"], 
                date:       object["custom_fields"]["date"], 
                dna:        object["custom_fields"]["dna"], 
                edition:    object["custom_fields"]["edition"]
              },
              description:  object["description"],
              external_url: object["external_url"],
              file_url:     object["file_url"],
              name:         object["name"]
            }]);
          }
          }).catch(error => { console.log(error); });*/
      //}).catch(error => { console.log(error); });*/
