
class Product{
    name;
    descripton;
    priceEth;
    priceUSD;
    path;
    id;
    purchased;
    owner;
    price;

    constructor(name, descripton, priceEth ,priceUSD , path, id, purchased, owner, price){
        this.name = name;
        this.descripton = descripton
        this.priceEth = priceEth
        this.priceUSD = priceUSD
        this.path = path
        this.id = id;
        this.purchased = purchased;
        this.owner = owner;
        this.price = price;
    }
}
export default Product;