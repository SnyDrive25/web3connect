import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

export default function Bayc() {

    const Web3 = require("web3");
    
    const [tokenInfos, setTokenInfos] = useState({
        transactionHash: "",
        blockNumber: "",
        cumulativeGasUsed: "",
        effectiveGasPrice: "",
        from: "",
        to: "",
        gasUsed: "",
    });

    const [infos, setInfos] = useState({
        number: null,
        name: ""
    });

    const abi = require("../../contracts/fakebayc.json").abi; 
    const address = "0x1dA89342716B14602664626CD3482b47D5C2005E"; 

    let web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(abi, address);

    async function claimToken(){
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts' }); 
        await contract.methods.claimAToken().send({from: accounts[0]})
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

    async function listAllTokens(){
        let number = await contract.methods.tokenCounter().call();
        let name = await contract.methods.name().call();
        const check = [];
        setInfos({
            number: number,
            name: name
        });
        for(let i = 0; i < number; i++) {
            let infos = await contract.methods.tokenURI(i).call();
            const data = await fetch(infos).then(res => res.json());
            check.push(data.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
            var s = "<img src='"+check[i]+"' class='nft' onclick='window.open(`./bayc/"+i+"`)' />";
            document.getElementById("listee").innerHTML += s;
        }
    }

    return (
        <div className='Page' onLoad={listAllTokens}>
            <Navbar />
            <div className="ctn">
                <h1>{infos.name}</h1>
                <br></br>
                <p className="infos-center">There are <span className="number">{infos.number}</span> beautiful tokens here !</p>
                <br></br>
                {!tokenInfos.transactionHash  &&
                <button onClick={() => claimToken()} className="button">Claim your Token</button>
                }
                {tokenInfos.transactionHash  &&
                <p className="infos infos-pretty">
                    <button onClick={() => (window.open("./bayc/" + infos.number))} className="info-btn">i</button>
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
                <div className="infos infos-pretty" id="listee">
                    <h1>Liste des Fake Bored Ape Yacht Club</h1>
                    <br></br>

                </div>
            </div>
        </div>
    );
}