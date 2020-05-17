import BaseFetcher from './baseFetcher';

class ProductFetcher extends BaseFetcher{
    static routerBaseUrl = '/product';
    
    static async getProducts(){
        return (await this.httpget(this.routerBaseUrl + '/getProducts')).data;
    }
    static async postProduct(name,description, priceUSD, priceETH, imgPath , blockChainId, blockChainStock, blockChainPrice){
       return this.httpPost(this.routerBaseUrl + '/uploadProduct', 
        {name:name, description:description, priceUSD:priceUSD, priceETH:priceETH, imgPath:imgPath , blockChainId:blockChainId, blockChainStock:blockChainStock, blockChainPrice:blockChainPrice});
    }
    static async purchaseProduct(id,amount){
        return this.httpPost(this.routerBaseUrl + '/purchaseProduct', {id:id,amount:amount});
    }
    static async updateProduct(id, name,description, priceUSD, priceETH, imgPath , blockChainStock, blockChainPrice){
        return this.httpPost(this.routerBaseUrl + '/updateProduct', 
                {id:id,name:name, description:description, priceUSD:priceUSD, priceETH:priceETH, imgPath:imgPath , blockChainStock:blockChainStock, blockChainPrice:blockChainPrice});
    
    }
   
}
export default ProductFetcher;
