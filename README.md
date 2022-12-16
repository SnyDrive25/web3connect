# ERC721 UX

## Launch the project - Way 1

Open the link https://snytoken.vercel.app/[https://snytoken.vercel.app/]

## Launch the project - Way 2

In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Code explaination

### Connection to web3

To connect to web3 with Metamask, I used the Web3.js library

```js
const Web3 = require("web3");

let web3 = new Web3(window.ethereum);
var contract = new web3.eth.Contract(abi, address);
```

### Execute functions from the smart contract

```js
async function interact(){
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts' });

    // if the function we interact with doesn't require any parameters :
    await contract.methods.contractFunction().send({from: accounts[0]})
    
    // if the function we interact with doesn't require any parameters but needs a price value :
    await contract.methods.contractFunction().send({from: accounts[0], value: 900050000000000000})

    // if the function we interact with requires parameters (here parameter1 and parameter2) :
    await contract.methods.contractFunction(parameter1, parameter2).send({from: accounts[0]})

        .then((res) => {
            setInfos(res)
        }); 
    }
```
