import { FC, useState, useEffect }      from "react";
import { formatUnits }                  from "@ethersproject/units";

import { useEthers }                    from "../../modules/usedapp2/hooks";
import { ApeObject as NFTObject }       from "../../models/Rekt Apes/ApeObject";
import metadata                         from '../../abi/metadata.json';
import PaginationComponent              from './AccountModalPagination';
import { ABI as abi, NFT as token }     from '../../abi/nftFunctions';
import { ethers } from "ethers";

const AccountModalCollection: FC<{balance: number}> = ({balance}) => {
    const [data, setData] = useState<NFTObject[]>([]);
    const [ tokensOfOwner, setTokensOfOwner ] = useState([]);

    const { account } = useEthers(); 
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(token, abi, signer);

    
    
    contract["tokensOfOwner(address)"](account)
        .then((r: any) => { const temp = r; temp && setTokensOfOwner(temp);})
        .catch((e: any) => { console.log(e); });
    
    const temp: any[] = tokensOfOwner;
    let indecies: number[] = [];
    if(account && tokensOfOwner) for(let i=0; i<balance; i++) indecies = [...indecies, tokensOfOwner[i] && formatUnits(tokensOfOwner[i], 0)];
    
    function MakeArray(data: NFTObject[], indecies: any[]) {
        let newArray: NFTObject[] = [];
        for(let index=0; index<=indecies.length; index++) { newArray = [...newArray, data[indecies[index]-1]]}
        return newArray;
    }
      
    function Collection(objectList: any) {
        const objects: NFTObject[] = objectList;
        setData(MakeArray(objects, indecies));
    }

    
    useEffect(() => {
        Collection(metadata);
    }, [tokensOfOwner])

    return (<PaginationComponent nftObjects = {data} />);
}

export default AccountModalCollection;
