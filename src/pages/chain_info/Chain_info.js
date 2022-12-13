import { useState } from "react";
import Web3 from 'web3';
import Navbar from "../../components/navbar/Navbar";
import Popup from "../../components/popup/Popup";

export default function ChainInfo() {

    const[isConnected, setIsConnected] = useState(false);
    const[account, setAccount] = useState("");
    const[chainId, setChainId] = useState("");
    const[lastBlock, setLastBlock] = useState("");

    const check = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log("Your browser does not have Metamask extension, please install it");
        }
        return provider;
    }

    const connect = async() => {
        try {
            const checked = check();
            if(checked) {
                setIsConnected(true);
                await checked.request({method: 'eth_requestAccounts'});
                const web3 = new Web3(checked);
                const user = await web3.eth.getAccounts();
                setAccount(user);
                const chainid = await web3.eth.getChainId();
                setChainId(chainid);
                const lastBlock = await web3.eth.getBlockNumber();
                setLastBlock(lastBlock);
                var theid = document.getElementById("theid").textContent;
                if(theid !== "11155111") {
                    document.getElementById("popup").style.display = "block";
                    document.getElementById("popup").style.opacity = "1";
                    setTimeout( function() {
                        document.getElementById("popup").style.display = "none";
                        document.getElementById("popup").style.opacity = "0";
                        window.location.reload(1);
                    }, 5000)
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className='Page'>
            <Navbar />
            <div className="ctn">
                {!isConnected &&
                    <button onClick={() => connect()} className="button">Connect to Metamask</button>
                }
            </div>
            <div className="ctn">
                {isConnected &&
                    <div className="grid">
                        <p>Address : <span className="code">{account}</span></p>
                        <p>Chain Id : <span className="code" id="theid">{chainId}</span></p>
                        <p>Last Block : <span className="code">{lastBlock}</span></p>    
                    </div>
                }
            </div>
            <Popup />
        </div>
    );
}