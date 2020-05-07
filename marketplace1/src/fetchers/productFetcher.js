import BaseFetcher from './baseFetcher';

class ProductFetcher extends BaseFetcher{
    static routerBaseUrl = '/product';
    
    static async postProduct(name,description, priceUSD, priceETH, imgPath , blockChainId, blockChainStock, blockChainPrice){
       return this.httpPost(this.routerBaseUrl + '/uploadProduct', 
        {name:name, description:description, priceUSD:priceUSD, priceETH:priceETH, imgPath:imgPath , blockChainId:blockChainId, blockChainStock:blockChainStock, blockChainPrice:blockChainPrice});
}
   
}
export default ProductFetcher;
