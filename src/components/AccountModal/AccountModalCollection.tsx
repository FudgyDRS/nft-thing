import { FC, useState, useEffect }      from "react";
import { formatUnits }                  from "@ethersproject/units";

import { useEthers }                    from "../../modules/usedapp2/hooks";
import { SharkObject }                  from "../../models/MTV Sharks/SharkObject";
import metadata                         from '../../abi/metadata.json';
import PaginationComponent              from './AccountModalPagination';
import { TokensOfOwner }                from '../../abi/mtvSharks';

const AccountModalCollection: FC<{balance: number}> = ({balance}) => {
    const [data, setData] = useState<SharkObject[]>([]);
    const { account } = useEthers();

    const temp: any[] = TokensOfOwner(account);
    let indecies: number[] = [];
    if(account && temp) for(let i=0; i<balance; i++) indecies = [...indecies, temp[i] && formatUnits(temp[i], 0)];

    function MakeArray(data: SharkObject[], indecies: any[]) {
        let newArray: SharkObject[] = [];
        for(let index=0; index<indecies.length; index++) { newArray = [...newArray, data[indecies[index]]]}
        return newArray;
    }
      
    function Collection(sharkList: any) {
        const objects: SharkObject[] = sharkList;
        setData(MakeArray(objects, indecies));
    }
    
    useEffect(() => { Collection(metadata); }, [temp])

    return (<PaginationComponent sharkObjects = {data} />);
}

export default AccountModalCollection;
