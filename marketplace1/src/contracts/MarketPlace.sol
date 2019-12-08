pragma solidity ^0.5.0;

contract MarketPlace {
    string public name;
    uint public productCount = 0; // how many products in the mapping
    mapping(uint =>Product) public products;


    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );
    
    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );
    constructor() public {
        name = "test MarketPlace";
    }
    function createProducts(string memory _name, uint _price ) public {
        //make sure parameters are correct
         // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        //increment productCount
        productCount++;
        //create the product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        //trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);

    } 
    function purchaseProduct(uint id) public payable {
        // Fetch the product
        Product memory product = products[id];
        // Fetch the owner
        address payable seller = product.owner;
        // Make sure the product has a valid id
        require(product.id > 0 && product.id <= productCount); 
        // Require that there is enough Ether in the transaction
        require(msg.value >= product.price);
        // Require that the product has not been purchased already
        require(!product.purchased);
        // Require that the buyer is not the seller
        require(msg.sender != seller);
        // Transfer ownership to the buyer
        product.owner = msg.sender;
        // Mark as purchased
        product.purchased = true;
        // Update the product
        products[id] = product;
        // Pay the seller by sending them Ether
        address(seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, product.name, product.price, msg.sender, true);

    }
}

