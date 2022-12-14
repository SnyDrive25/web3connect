import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";

export default function Nefturians() {

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
        tokenPrice: null,
        name: ""
    });

    const abi = require("../../contracts/nefturians.json").abi; 
    const address = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED"; 

    let web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(abi, address);

    async function buyToken(){
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts' }); 
        await contract.methods.buyAToken().send({from: accounts[0], value: 100010000000000000})
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

    async function getInfos(){
        let tknp = await contract.methods.tokenPrice().call();
        let name = await contract.methods.name().call();
        setInfos({
            tokenPrice: tknp,
            name: name
        });
    }

    return (
        <div className='Page' onLoad={getInfos}>
            <Navbar />
            <div className="ctn">
                <h1>{infos.name}</h1>
                <br></br>
                <p className="infos-center">The minimum Token price is <span className="number">{infos.tokenPrice}</span></p>
                <br></br>
                {!tokenInfos.transactionHash  &&
                <button onClick={() => buyToken()} className="button">Claim your Token</button>
                }
                {tokenInfos.transactionHash  &&
                <p className="infos infos-pretty">
                    <button onClick={() => (window.open("./nefturians/" + tokenInfos.from))} className="info-btn">i</button>
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