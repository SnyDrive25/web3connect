import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Web3 from 'web3';

export default function Bayc() {

    const [infos, setInfos] = useState({
        number: 0,
        name: ""
    }); 

    const [tokenInfos, setTokenInfos] = useState({
        transactionHash: "",
        blockNumber: "",
        cumulativeGasUsed: "",
        effectiveGasPrice: "",
        from: "",
        to: "",
        gasUsed: "",
    }); 
    

    const abi = require("../../contracts/fakebayc.json").abi; 
    const address = "0x1dA89342716B14602664626CD3482b47D5C2005E"; 

    let web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(abi, address);

    useEffect(() => {
        getNumberAndName();
    });

    async function getNumberAndName() {
        let number = await contract.methods.tokenCounter().call();
        let name = await contract.methods.name().call();
        setInfos({
            number: number,
            name: name
        });
    }

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

    return (
        <div className='Page'>
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
                    <button onClick={() => (console.log)} className="info-btn">i</button>
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