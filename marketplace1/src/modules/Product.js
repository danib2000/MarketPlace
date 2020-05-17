
class Product{
    name;
    description;
    priceEth;
    priceUSD;
    imgPath;
    ownerId;
    blockChainId;
    blockChainPrice;
    blockChainStock;
    dbId;
    constructor(name, description, priceEth ,priceUSD , path, ownerId, blockChainId, blockChainPrice, blockChainStock,dbId){
        this.name = name;
        this.description = description;
        this.priceEth = priceEth;
        this.priceUSD = priceUSD;
        this.imgPath = path;
        this.ownerId = ownerId;
        this.blockChainId = blockChainId;
        this.blockChainPrice = blockChainPrice;
        this.blockChainStock = blockChainStock;
        this.dbId = dbId;
    }
}
export default Product;