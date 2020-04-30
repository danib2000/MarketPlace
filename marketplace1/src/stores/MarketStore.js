import {observable, action} from 'mobx';
import Web3 from 'web3';
import MarketPlace from '../abis/MarketPlace.json'
import rootStore from './';
import {CURRENT_USER_STORE} from './storeKeys';
import axios from 'axios';

class MarketStore{
    @observable products =[];
    @observable account = "";
    @observable marketplace;
    @observable usdPrice;
    productCount;

    @action
    createp = (name , price) => {
        this.account = rootStore[CURRENT_USER_STORE].currentUserStore.currentUser.walletAddress;
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
                    this.loadProducts();
                }
            });
        });
        
        
        
    }
    @action 
    async getEthPriceInUsd(){
        this.usdPrice = await (await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD')).data.USD;
    }
    @action 
    async loadProducts(){
        this.productCount = await this.marketplace.methods.productCount().call();
        for(var i =0;i <=this.productCount; i++){
            const product = await this.marketplace.methods.products(i).call();
            this.products[i] = product;
        }
        console.log(this.products);
    }
    @action
    cleanStore(){
        this.products =[];
        this.account = ""; 
    }
}
    
//var store = window.stores = new MarketStore;

export default MarketStore;