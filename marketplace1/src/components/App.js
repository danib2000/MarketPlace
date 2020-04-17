import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import About from './About'
import Profile from './logIn/profile/profile'
import LocalStorage from '../localStorage/localStorageUtil';
import rootStores from '../stores';
import {CURRENT_USER_STORE, MARKET_STORE} from '../stores/storeKeys';
import { observer } from 'mobx-react';


const currentUserStore = rootStores[CURRENT_USER_STORE];
@observer
class App extends Component {
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

    async componentDidMount() {
     await LocalStorage.getTokenFromLocalStorage().then( async (token) =>{
      if(token){
        //currentUserStore.initUserFromAPI();
        await currentUserStore.initUserFromAPI();
        console.log(currentUserStore);
      }
    }).catch((err) => {
      console.log(err.message);
    });
    try{ 
    //await this.loadWeb3()
    //await this.loadBlockchainData()
    // store.loadWeb3();
    // store.loadBlockchainData();
    rootStores[MARKET_STORE].loadWeb3();
    rootStores[MARKET_STORE].loadBlockchainData();
    }
    catch{
      window.alert('Non-Ethereum browser detected, you wont be able to purchase items. You should consider trying MetaMask!')
    }
    this.setState({loading:false})
  } 

 
  render() {
    if(this.state.loading){
      return(<div></div>)
    }else 
    {
    return(
      <Router>
      <div>
           <div><Navbar/></div>
        <Switch>
          <Route exact path='/' component={Home} /> 
          {/* <Route path='/contact' component={Contact} /> */}
           <Route path='/about' component={About} />
           <Route path='/profile' component={Profile}/>
      </Switch>
      </div>
  </Router>
          
    )
  }}
}

export default App;
