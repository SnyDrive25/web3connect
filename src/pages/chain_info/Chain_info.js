import { useState } from "react";
import Web3 from 'web3';
import Navbar from "../../components/navbar/Navbar";

export default function Home() {

    const[isConnected, setIsConnected] = useState(false);
    const[account, setAccount] = useState("");
    const[balance, setBalance] = useState("");

    const check = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log("Your browser does not have Metamask extension, please install it");
        }
        console.log(account);
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
                setAccount(user[0]);
                const balance = await web3.eth.getBalance(account);
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
                    <button onClick={connect} className="button">Connect to Metamask</button>
                }
            </div>
            <div className="ctn">
                {isConnected &&
                    <div className="grid">
                        <a>Address : <span className="code">{account}</span></a>
                        <br></br>
                        <a>Balance : <span className="code">{balance}</span></a>    
                    </div>
                }
            </div>
        </div>
    );
}