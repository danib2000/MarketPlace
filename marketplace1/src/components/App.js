import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Web3 from 'web3';
import MarketPlace from '../abis/MarketPlace.json';
import Navbar from './Navbar';
import Home from './Home';
import About from './About'
import store from '../stores/MarketStore';

class App extends Component {

  async componentWillMount() {
    
    try{ 
    //await this.loadWeb3()
    //await this.loadBlockchainData()
    store.loadWeb3();
    store.loadBlockchainData();
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
      this.setState({loading:false})
      this.setState({ marketplace})
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
           <Navbar/>
        <Switch>
          <Route exact path='/' component={Home} /> 
          {/* <Route path='/contact' component={Contact} /> */}
           <Route path='/about' component={About} />
      </Switch>
      </div>
  </Router>
          
    )
    
  }
}

export default App;
