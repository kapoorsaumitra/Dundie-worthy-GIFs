import React, { useEffect,useState } from "react";
import twitterLogo from "./assets/Twitter.svg";
import "./App.css";

// Constants
const TWITTER_HANDLE = "0xKapoor";
const TWITTER_LINK = `https://twitter.com/0xKapoor`;

const App = () => {

  const [walletAddress,setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log("Phantom Wallet found!");

      const response = await window.solana.connect({ onlyIfTrusted:true});
      console.log(
        'Connected with Public Key:',
        response.publicKey.toString()
      );

        setWalletAddress(response.publicKey.toString());

    } else {
      alert(
        "Listen up, Dunder Mifflin. We need to acquire Phantom wallets for secure storage and transfer of digital assets. Failure to comply will not be tolerated."
      );
    }
  };

  const connectWallet = async () => {
    const {solana} = window;

    if (solana){
      const response = await solana.connect();
      console.log("Connected with Public Key:",response.publicKey.toString());
      setWalletAddress(response.publicKey.toString())
    }
  };

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect Wallet
    </button>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Dundie-Worthy GIFs</p>
          <p className="sub-text">
            The ultimate collection of 'The Office' GIFs that deserve their own
            Dundie!
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
