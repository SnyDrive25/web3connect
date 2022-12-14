import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import signs from "../../contracts/signatures.json";
import "../../index.css";

export default function Meebits() {

    const Web3 = require("web3");
    
    const [name, setName] = useState("");

    const [tokenInfos, setTokenInfos] = useState({
        transactionHash: "",
        blockNumber: "",
        cumulativeGasUsed: "",
        effectiveGasPrice: "",
        from: "",
        to: "",
        gasUsed: "",
    });

    const abi3 = require("../../contracts/meebits.json").abi; 
    const address3 = "0xD1d148Be044AEB4948B48A03BeA2874871a26003"; 

    let web3 = new Web3(window.ethereum);
    var contract3 = new web3.eth.Contract(abi3, address3);

    const abi4 = require("../../contracts/claim_meebits.json").abi; 
    const address4 = "0x5341e225Ab4D29B838a813E380c28b0eFD6FBa55"; 

    let web4 = new Web3(window.ethereum);
    var contract4 = new web4.eth.Contract(abi4, address4);

    async function displayName() {
        let name = await contract3.methods.name().call();
        setName(name);
    }

    async function mintToken(){
        let token = document.getElementById("mint").value;
        let valide = await contract4.methods.tokensThatWereClaimed(token).call();
        if(valide) {
            alert("Oops, something went wrong... It seems that the token doesn't exist !");
        }
        else {
            let sign = signs[token].signature;
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts' }); 
            await contract4.methods.claimAToken(token, sign).send({from: accounts[0]})
                .then((res) => {
                    setTokenInfos({
                        transactionHash: res.transactionHash,
                        blockNumber: res.blockNumber,
                        cumulativeGasUsed: res.cumulativeGasUsed,
                        effectiveGasPrice: res.effectiveGasPrice,
                        from: res.from,
                        to: res.to,
                        gasUsed: res.gasUsed,
                    })
                }); 
        }
    }

    return (
        <div className='Page' onLoad={displayName}>
            <Navbar />
            <div className="ctn">
                <h1>{name}</h1>
                <br></br>
                {!tokenInfos.transactionHash  &&
                <input className="input" placeholder="Enter the Token Id to mint" id="mint" type="number" min='0' max='19999'></input>
                }
                <br></br>
                {!tokenInfos.transactionHash  &&
                <button onClick={() => mintToken()} className="button">Mint your Token</button>
                }
                {tokenInfos.transactionHash  &&
                <p className="infos infos-pretty">
                    <button onClick={() => (window.open("https://sepolia.etherscan.io/tx/" + tokenInfos.transactionHash))} className="info-btn">i</button>
                    <br></br>
                    <br></br>
                    <table>
                        <tr><td className="noborder">Transaction Hash</td><td className="noborder"><code>{tokenInfos.transactionHash}</code></td></tr>
                        <tr><td>Block Number</td><td><code>{tokenInfos.blockNumber}</code></td></tr>
                        <tr><td>Cumulative Gas Used</td><td><code>{tokenInfos.cumulativeGasUsed}</code></td></tr>
                        <tr><td>Effective Gas Price</td><td><code>{tokenInfos.effectiveGasPrice}</code></td></tr>
                        <tr><td>Gas Used</td><td><code>{tokenInfos.gasUsed}</code></td></tr>
                        <tr><td className="noborder"></td><td className="noborder"></td></tr>
                        <tr><td>From</td><td><code>{tokenInfos.from}</code></td></tr>
                        <tr><td>To</td><td><code>{tokenInfos.to}</code></td></tr>
                    </table>
                </p>
                }
                
            </div>
        </div>
    );
}