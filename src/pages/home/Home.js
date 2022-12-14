import Navbar from "../../components/navbar/Navbar";

export default function Home() {

    return (
        <div className='Page'>
            <Navbar />
            <div className="ctn">
                <h1>Welcome</h1>
                <br></br>
                <div className="full-width">
                    <p className="infos-special">
                        In this website, you will be able to claim ERC721 tokens with different types
                        <br></br>
                        <br></br>
                        - In the <a href="./chain_info" className="link">Chain Info</a> part, you can connect yourself to Metamask and get display your address, the current ChainId and the Last Block.
                        <br></br>
                        - In the <a href="./bayc" className="link">BAYC</a> part, you can claim your fake Board Ape Yacht Club NFT and your transaction will be displayed with all its informations. Once the transaction card appeared, you can click on the i button to get the information of the token you got in another page.
                        <br></br>
                        - In the <a href="./nefturians" className="link">Nefturians</a> part, you can see the minimum price of a token and you can use the button to buy a token. Also, you can display the tokens of any owner by inserting his address in the path.
                        <br></br>
                        - In the <a href="./meebits" className="link">Meebits</a> part, you must enter the token you would like to claim and the press on the Claim button that will catch the signature data to succeed the transaction. This transaction's information will be displayed after that.
                    </p>
                </div>
            </div>
        </div>
    );
}