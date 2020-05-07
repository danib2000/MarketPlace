import {observable, action} from 'mobx';
import Web3 from 'web3';
import MarketPlace from '../abis/MarketPlace.json'
import MarketPlace2 from '../abis/MarketPlace2.json'
import rootStore from './';
import {CURRENT_USER_STORE} from './storeKeys';
import axios from 'axios';
import ProductFetcher from '../fetchers/productFetcher';
class MarketStore{
    @observable productsBlockChain =[];
    @observable account = "";
    @observable marketplace;
    @observable usdPrice;
    marketPlace2;
    productCount;
    isError=false;
    @action
    async createProduct(name , description, priceUSD, priceETH, imgPath, stock){
        //creates product on blockchain
        try{
            const web3 = window.web3
            const priceInWie = web3.utils.toWei(priceETH, 'Ether');
            this.marketPlace2.methods.createProducts(name, priceInWie, stock).send({from:this.account})
            .catch( (err)=>{
                this.isError=true;
                console.log(err);
                console.log(this.isError);
                return err;
        }); 
        console.log(this.isError);
        if(this.isError === false){
            this.isError=false;
            var id = parseInt(this.productCount);
            id++;
            this.uploadProduct(name , description, priceUSD, priceETH, imgPath, id, stock, priceInWie);
        }
        }catch{
        }
      
   
    }

    // async createProduct(name , description, priceUSD, priceETH, imgPath, stock){
    //     //creates product on blockchain
    //     const web3 = window.web3
    //     const priceInWie = web3.utils.toWei(priceETH, 'Ether');
    //     this.marketPlace2.methods.createProducts(name, priceInWie, stock).send({from:this.account})
    //     .catch( (err)=>{
    //         this.isError=true;
    //         console.log(err);
    //         return err;
    // }); 
    // if(this.isError){
    //     this.isError=false;
    //     this.uploadProduct(name , description, priceUSD, priceETH, imgPath, parseInt(this.productCount)++, stock, priceInWie);
    //     console.log('asd');
    // }
    // }
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
                    const marketPlace2 = web3.eth.Contract(MarketPlace2.abi, networkData.address);

                    console.log(marketPlace);
                    this.marketplace = marketPlace;
                    this.marketPlace2 = marketPlace2;
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
        this.productCount = await this.marketPlace2.methods.productCount().call();
        for(var i =0;i <=this.productCount; i++){
            const product = await this.marketPlace2.methods.products(i).call();
            this.productsBlockChain[i] = product;
        }
        console.log(this.productCount);
        console.log(this.productsBlockChain);
    }
    @action
    async uploadProduct(name , description, priceUSD, priceETH, imgPath, id, stock, priceInWie){
        ProductFetcher.postProduct(name , description, priceUSD, priceETH, imgPath, id, stock, priceInWie);
    }
    @action
    async purchaseProduct(product){
        console.log(this.productsBlockChain[3]);
        const id = this.productsBlockChain[3].id;
        const price = this.productsBlockChain[3].price;
        this.marketplace.methods.purchaseProduct(id).send({ from: this.account, value: price })
        .on('receipt', (receipt)=>{
            console.log(receipt);
            console.log('asd');
            
        }).on('receipt', function(receipt){
            // receipt example
            console.log(receipt);
            console.log('baa');
        })
        .catch( (err)=>{
        console.log(err);
        return err;
    });
    }
    @action
    cleanStore(){
        this.products =[];
        this.account = ""; 
    }
}
    
//var store = window.stores = new MarketStore;

export default MarketStore;