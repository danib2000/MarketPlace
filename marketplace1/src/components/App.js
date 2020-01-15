import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Web3 from 'web3';
import MarketPlace from '../abis/MarketPlace.json';
import SignPage from './logIn/logIn';
import Home from './Home';
import About from './About'
class App extends Component {

  async componentWillMount() {
    try{ 
    await this.loadWeb3()
    await this.loadBlockchainData()
    }
    catch{
      window.alert('Non-Ethereum browser detected, you wont be able to purchase items. You should consider trying MetaMask!')
    }
  }    
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    //console.log(accounts);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    console.log(MarketPlace.abi)

    const networkData = MarketPlace.networks[networkId];
    if(networkData) { //need to connect metamast to ganache on 127.0.0.1:7545
      const marketplace = web3.eth.Contract(MarketPlace.abi, networkData.address);
      //window.alert('qwe');

      console.log(marketplace);
    } else {
      window.alert('Marketplace contract not deployed to detected network.');
    } 
  }

  constructor(props)
  {
    super(props);
    this.state = {

      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
  }
  render() {
    return(
      <Router>
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <ul className="navbar-nav mr-auto">
          
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            {/* <li><Link to={'/contact'} className="nav-link">Contact</Link></li> */}
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          <div>
            <SignPage />
          </div>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              {/* <Route path='/contact' component={Contact} /> */}
              <Route path='/about' component={About} />
          </Switch>
        </div>
      </Router>
    
    )
    //return (
      //<div><logIn/></div>
      //<div>hello <logIn/></div>
      


      // <div>
      //   <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      //     <a
      //       className="navbar-brand col-sm-3 col-md-2 mr-0"
      //       href="http://www.dappuniversity.com/bootcamp"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       ETH MarketPlace test!!!
      //     </a>
      //   <ul className="navbar-nav px-3">
      //     <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
      //       <small className="text-white"><span id="account">address : {this.state.account}</span></small>
      //     </li>
      //   </ul>
      //   </nav>
      //   <div className="container-fluid mt-5">
      //     <div className="row">
      //       <main role="main" className="col-lg-12 d-flex text-center">
      //         <div className="content mr-auto ml-auto">
      //           <a
      //             href="http://www.dappuniversity.com/bootcamp"
      //             target="_blank"
      //             rel="noopener noreferrer"
      //           >
      //             <img src={logo} className="App-logo" alt="logo" />
      //           </a>
      //           <h1>Dapp University Starter Kit</h1>
      //           <p>
      //             Edit <code>src/components/App.js</code> and save to reload.
      //           </p>
      //           <a
      //             className="App-link"
      //             href="http://www.dappuniversity.com/bootcamp"
      //             target="_blank"
      //             rel="noopener noreferrer"
      //           >
      //             LEARN BLOCKCHAIN <u><b>NOW! </b></u>
      //           </a>
      //         </div>
      //       </main>
      //     </div>
      //   </div>
      // </div>
    //);
  }
}

export default App;
