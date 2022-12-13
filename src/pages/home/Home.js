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
                        - [Nefturians]
                        <br></br>
                        - [Meebits]
                        <br></br>
                        - [Meebits Claimer]
                    </p>
                </div>
            </div>
        </div>
    );
}