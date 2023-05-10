import React, { useEffect,useState } from "react";
// import twitterLogo from "./assets/Twitter.svg";
import githubLogo from "./assets/github.svg";
import "./App.css";

// Constants
const TEST_GIFS=[
  'https://media.giphy.com/media/l0amJzVHIAfl7jMDos/giphy.gif',
  'https://media.giphy.com/media/2oUfvvUgQHnLsQWFMW/giphy.gif',
  'https://media.giphy.com/media/LuvsSH7vbGeKtZ238M/giphy.gif',
  'https://media.giphy.com/media/hjvinhl1pUrb1gdzlV/giphy.gif'
]
// const TWITTER_HANDLE = "0xKapoor";
// const TWITTER_LINK = `https://twitter.com/0xKapoor`;
const GITHUB_HANDLE = "kapoorsaumitra";
const GITHUB_LINK = "https://github.com/kapoorsaumitra";

const App = () => {

  const [walletAddress,setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

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

  const onInputChange = (event) => {
    const {value} = event.target;
    setInputValue(value);
  }

  const sendgif = async() => {
    if(inputValue.length > 0){
      console.log('GIF link: ', inputValue)
      setGifList([...gifList,inputValue])
      setInputValue('')
    }
    else{
      console.log("Empty input? That's a swing and a miss. Take another shot, champ.")
    }
  }

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect Wallet
    </button>
  )

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendgif();
        }}
      >
        <input type="text" placeholder="Enter a Dundie-Worthy GIF link!" value={inputValue} onChange={onInputChange}/>
        <button type="submit" className="cta-button submit-gif-button">Submit</button>
      </form>
      <div className="gif-grid">
        {gifList.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif}/>
          </div>
        ))}
      </div>
    </div>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching the list? I got this! I'll have it for you faster than you can say 'GIF'")
    }
  })

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
          {walletAddress && renderConnectedContainer()}
        </div>
        
        <div className="footer-container-grow">
          <div className="footer-container">
           <img alt="GitHub Logo" className="github-logo" src={githubLogo} />
            <a
              className="footer-text"
              href={GITHUB_LINK}
              target="_blank"
              rel="noreferrer"
            >{`@${GITHUB_HANDLE}`}</a>
         </div>
        </div>
      </div>
    </div>
  );
};

export default App;
