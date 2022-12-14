import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';

export default function NefturiansUserInfo() {

    const Web3 = require("web3");

    const [userAdd, setUserAdd] = useState();
    const { handle } = useParams();
    const [userInfos, setUserInfos] = useState({
        name: [],
        description: []
    })

    useEffect(() => {
        setUserAdd(handle);
    }, []);

    const abi = require("../../contracts/nefturians.json").abi; 
    const address = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED"; 

    let web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(abi, address);

    async function getUserInfo(){
        let iter = await contract.methods.balanceOf(userAdd).call();
        for(let i = 0; i < iter; i++) {
            const id = await contract.methods.tokenOfOwnerByIndex(userAdd, i).call();
            const data = await contract.methods.tokenURI(id).call();
            const final_data = await fetch(data).then(res => res.json());
            document.getElementById("ooo").innerHTML += "<div class='infos infos-pretty pretty2'><h1>" + JSON.stringify(final_data.name) + "</h1><p>" + JSON.stringify(final_data.description) + "</p><p class='al-left'>" + JSON.stringify(final_data.attributes).replace("[","").replace("]","").split('"trait_type":').map(item => item.trim()).join('').split('"value"').map(item => item.trim()).join('').split(",").map(item => item.trim()) + "</p><p><button class='button btn-center' onclick='window.open(" + JSON.stringify(final_data.image) + ")'>Link</button></p></div>";
        }
    }

    return (
        <div className='Page' onLoad={getUserInfo}>
            <Navbar />
            <div id="ooo">
                
            </div>
        </div>
    );
}