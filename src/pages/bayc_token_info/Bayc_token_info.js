import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Web3 from 'web3';
import { useParams } from 'react-router-dom';

export default function BaycTokenInfo() {

    const [tokenId, setTokenId] = useState();
    const { handle } = useParams();

    useEffect(() => {
        setTokenId(handle);
    }, [handle]);

    return (
        <div className='Page'>
            <Navbar />
            <div className="ctn">
                <p className="infos">
                    Token Id : {tokenId}
                </p>
            </div>
        </div>
    );
}