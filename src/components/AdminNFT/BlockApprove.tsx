import { FC, useState, useEffect } from 'react';
import { Input, Text, Box } from "@chakra-ui/react";

import { useEthers } from "../../modules/usedapp2/hooks";
//import { ApeObject as NFTObject } from "../../models/Rekt Apes/ApeObject";
//import { OwnerOf } from '../../abi/nftFunctions';
import { ButtonTransfer } from './Buttons';

const BlockApprove: FC = () => {
    const { account } = useEthers();

    //const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [inputValue3, setInputValue3] = useState("");
    //const [isOwner, setIsOwner] = useState(true);

    //const { account } = useEthers();
    //const handleChange1 = (e: any) => setInputValue1(e.target.value);
    const handleChange2 = (e: any) => setInputValue2(e.target.value == account ? "Error: addresses must be different" : e.target.value);
    const handleChange3 = (e: any) => setInputValue3(e.target.value);



    useEffect(() => {  }, [handleChange2, handleChange3])

    return(<Box width="400px" backgroundColor={"#282c34"} borderRadius={"0.6em"} padding={"0.8em"} margin={"1em"} textColor={"#ffffff"}>
    <Text>From: </Text>
    <Input paddingEnd="-0.1em" backgroundColor={"#7e7e7e"} value={String(account)}/>
    <Text>To: </Text>
    <Input className="quantity" backgroundColor={"#7e7e7e"} value={inputValue2} onChange={handleChange2}/>
    <Text>Token ID: </Text>
    <Input className="quantity" backgroundColor={"#7e7e7e"} value={inputValue3} marginBottom={"0.5em"} onChange={handleChange3}/>
    <ButtonTransfer _from={account} _to={inputValue2} _tokenId={Number(inputValue3)}/>
    </Box>);
}
 
export default BlockApprove;
