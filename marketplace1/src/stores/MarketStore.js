import {observable, action} from 'mobx';
import Web3 from 'web3';
import MarketPlace from '../abis/MarketPlace.json'

class MarketStore{
    @observable products =[];
    @observable account = "";
    @observable marketplace;

    @action
    createp = (name , price) => {
        // this.loadWeb3();
        // this.loadBlockchainData();
        this.marketplace.methods.createProducts(name, price).send({from:this.account})
        .once('receipt', (receipt)=> {
        console.log(receipt);
    })
    }
    @action
    loadWeb3 =() => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            window.ethereum.enable()
          }
          else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
          }

    }
    @action
    loadBlockchainData = () => {
        const web3 = window.web3
        web3.eth.getAccounts().then((accounts)=>{
            this.account = accounts[0]
            web3.eth.net.getId().then((networkId)=>{   
                const networkData = MarketPlace.networks[networkId];
        
                if(networkData) { //need to connect metamast to ganache on 127.0.0.1:7545
                    const marketPlace = web3.eth.Contract(MarketPlace.abi, networkData.address);
                    console.log(marketPlace);
                    this.marketplace = marketPlace;
                }
            });
        });
        
        
        
    }
}

//var store = window.stores = new MarketStore;

export default MarketStore;