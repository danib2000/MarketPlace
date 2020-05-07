pragma solidity ^0.5.0;

contract MarketPlace2 {
    string public name;
    uint public productCount = 0; // how many products in the mapping
    mapping(uint =>Product) public products;


    struct Product {
        uint id;
        string name;
        uint price;
        uint stock;
        address payable owner;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        uint stock,
        address payable owner
    );
    
    event ProductPurchased(
        uint id,
        string name,
        uint price,
        uint stock,
        address payable owner
    );
    event ProductUpated(
        uint id,
        string newName,
        uint newPrice,
        uint newStock
    );
    constructor() public {
        name = "MarketPlace2.0";
    }
    function createProducts(string memory _name, uint _price, uint _stock) public {
        //make sure parameters are correct
         // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Require a valid stock
        require(_stock > 0);
        //increment productCount
        productCount++;
        //create the product
        products[productCount] = Product(productCount, _name, _price, _stock, msg.sender);
        //trigger an event
        emit ProductCreated(productCount, _name, _price, _stock, msg.sender);

    } 

    function updateProduct(uint id, string memory newName, uint newPrice, uint newStock) public{
        //make sure parameters are correct
         // Require a valid name
        require(bytes(newName).length > 0);
        // Require a valid price
        require(newPrice > 0);
        // Require a valid stock
        require(newStock > 0);
        //increment productCount
        Product memory product = products[id];
        product.name = newName;
        product.price = newPrice;
        product.stock = newStock;
        products[id] = product;
        // Trigger an event
        emit ProductUpated(productCount, newName, newPrice, newStock);

    }

    function purchaseProduct(uint id, uint amount) public payable {
        // Fetch the product
        Product memory product = products[id];
        // Fetch the owner
        address payable seller = product.owner;
        // Make sure the product has a valid id
        require(product.id > 0 && product.id <= productCount); 
        // Require that there is enough Ether in the transaction
        require(msg.value * amount >= product.price);
        // Require that the buyer is not the seller
        require(msg.sender != seller);
        require(amount <= product.stock);
        product.stock --;
        // Update the product
        products[id] = product;
        // Pay the seller by sending them Ether
        address(seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, product.name, product.price, product.stock, msg.sender);

    }
}

