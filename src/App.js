import twitterLogo from './assets/Twitter.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '0xKapoor';
const TWITTER_LINK = `https://twitter.com/0xKapoor`;

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Dundie-Worthy GIFs</p>
          <p className="sub-text">
          The ultimate collection of 'The Office' GIFs that deserve their own Dundie!
          </p>
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
