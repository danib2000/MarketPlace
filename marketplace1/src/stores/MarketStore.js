import {observable, action} from 'mobx';
import Web3 from 'web3';
//import MarketPlace from '../abis/MarketPlace.json'
import MarketPlace2 from '../abis/MarketPlace2.json'
import axios from 'axios';
import Product from '../modules/Product';
import ProductFetcher from '../fetchers/productFetcher';
class MarketStore{
    productsBlockChain = [];
    @observable productsDB = [];
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
        if(this.isError === false){
            this.isError=false;
            var id = parseInt(this.productCount);
            id++;
            this.uploadProduct(name , description, priceUSD, priceETH, imgPath, id, stock, priceInWie);
        }
        }catch{
        }
      
        this.loadProducts();
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
            this.account = accounts[0];
            web3.eth.net.getId().then( async (networkId)=>{   
                const networkData = MarketPlace2.networks[networkId];  
                if(networkData) { //need to connect metamast to ganache on 127.0.0.1:7545
                    //const marketPlace = web3.eth.Contract(MarketPlace.abi, networkData.address);
                    const marketPlace2 = web3.eth.Contract(MarketPlace2.abi, networkData.address);
                    //this.marketplace = marketPlace;
                    this.marketPlace2 = marketPlace2;
                    await this.loadProducts();
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
        this.productsDB = [];
        this.productsBlockChain = []; 
        this.productCount = await this.marketPlace2.methods.productCount().call();
        //load products from blockchain
        for(var i =0;i <=this.productCount; i++){
            const product = await this.marketPlace2.methods.products(i).call();
            this.productsBlockChain[i] = product;
        }
        this.loadProductsDB();
        console.log(this.productsBlockChain);
    }
    @action loadProductsDB(){
        ProductFetcher.getProducts().then(products =>{
            products.forEach(product => {
                const newProduct = new Product(
                    product.name, 
                    product.description, 
                    product.priceETH, 
                    product.priceUSD, 
                    product.imgLink, 
                    product.sellerInfo,
                    product.blockChainId, 
                    product.blockChainPrice, 
                    product.blockChainStock,
                    product._id);
                this.productsDB.push(newProduct);

            });
            console.log(this.productsDB);
        });
    }
    @action
    async uploadProduct(name , description, priceUSD, priceETH, imgPath, id, stock, priceInWie){
        ProductFetcher.postProduct(name , description, priceUSD, priceETH, imgPath, id, stock, priceInWie);
    }
    @action
    async purchaseProduct(product){
        const id = product.blockChainId;
        const price = this.productsBlockChain[product.blockChainId].price;
        this.marketPlace2.methods.purchaseProduct(id, product.quantity).send({ from: this.account, value: price * product.quantity})
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
        ProductFetcher.purchaseProduct(product.dbId,product.quantity).then(()=>{
            this.loadProducts();
        });
    }
    @action
    async updateProduct(product){
        const web3 = window.web3;
        console.log(product.priceEth);
        const priceInWie = web3.utils.toWei(product.priceEth, 'Ether');
        this.marketPlace2.methods.updateProduct(product.blockChainId, product.name, priceInWie, product.blockChainStock).send({from:this.account});
        ProductFetcher.updateProduct(
            product.dbId,
            product.name, 
            product.description,  
            product.priceUSD, 
            product.priceEth,
            product.imgPath, 
            product.blockChainStock, 
            priceInWie, 
            );
    }
    @action
    cleanStore(){
        //this.products =[];
        this.account = ""; 
    }
}
    
//var store = window.stores = new MarketStore;

export default MarketStore;