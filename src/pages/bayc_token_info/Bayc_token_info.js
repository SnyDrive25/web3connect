import { useState, useEffect } from "react";
import { IpfsImage } from 'react-ipfs-image';
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

export default function BaycTokenInfo() {

    const Web3 = require("web3");

    const [tokenId, setTokenId] = useState();
    const { handle } = useParams();
    const [tokenInfos, setTokenInfos] = useState({
        attributes: "",
        image: "",
    })

    useEffect(() => {
        setTokenId(parseInt(handle));
    }, []);

    const abi = require("../../contracts/fakebayc.json").abi; 
    const address = "0x1dA89342716B14602664626CD3482b47D5C2005E"; 

    let web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(abi, address);

    async function getTokenInfos(){
        var number = await contract.methods.tokenCounter().call();
        window.number = number;
        if(tokenId >= parseInt(number)) {
            alert("Error: this tokenId doesn't exist !");
            window.location.href = "./0";
        }
        else {
            let infos = await contract.methods.tokenURI(tokenId).call();
            const data = await fetch(infos).then(res => res.json());
            setTokenInfos({
                attributes: JSON.stringify(data.attributes).replace("[","").replace("]","").split('"trait_type":').map(item => item.trim()).join('').split('"value"').map(item => item.trim()).join('').split(",").map(item => item.trim()),
                image: data.image
            });
        }
    }

    function goToLeft() {
        var loc = Math.max(parseInt(handle) - 1, 0);
        window.location.href = "./" + loc;
    }

    function goToRight() {
        var loc = Math.min(parseInt(handle) + 1, window.number);
        window.location.href = "./" + loc;
    }

    return (
        <div className='Page' onLoad={getTokenInfos}>
            <Navbar />
            <div className="ctn">
                <div className="infos infos-pretty flex">
                    <p>
                        Token Id : {tokenId}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        Token infos :
                        <br></br>
                        <br></br>
                        <code>{tokenInfos.attributes}</code>
                    </p>
                    <p>
                        <IpfsImage hash={tokenInfos.image} className="image" />
                    </p>
                </div>
            </div>
            <div className="contentt-flex">
                <div className="btn-left" onClick={() => goToLeft()}>Previous</div>
                <div className="btn-right" onClick={() => goToRight()}>Next</div>
            </div>
        </div>
    );
}