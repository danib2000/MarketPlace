import React, { Component } from 'react';
import rootStore from '../stores';
import {MARKET_STORE} from '../stores/storeKeys';
import { Grid, Image, Card, Button } from 'semantic-ui-react'
import Product from '../modules/Product'
const marketStore = rootStore[MARKET_STORE];
class CreateProduct extends Component {
    state = {
      columns:3,
      products:[]
  };

  componentDidMount(){
    //get amount of products
    
  }
  buyProduct(product){
    console.log(product);
    marketStore.purchaseProduct();
  }
  loadCard(product){
    return <Card style={{width:'400px'}} >
            <Image src={product.path} wrapped ui={false} className='card-image'/>
            <Card.Content>
              <Card.Header
              textAlign='center'>{product.name}</Card.Header>
              <Card.Description textAlign='center'>
                {product.descripton}
              </Card.Description>
              <Card.Content className='lower-content' >
                priceETH:{product.priceEth}Ξ
                <span> priceUSD:{product.priceUSD}$</span>
              </Card.Content>
              <Button onClick={this.buyProduct.bind(this, product)}>
                Buy Now
              </Button>
            </Card.Content>
            
          </Card>
  }
  loadGrid(){
    for(var i = 0;i<this.state.products.length;i++){

    }
  }
  product = new Product('iphone','Smart phone from apple','1.5','650','http://localhost:3001/iphone.jpeg');
  render() {
    return (
            <div id="content" style={{marginTop :"40px"}}>
        <h1>Add Product</h1>
              <form onSubmit={(event) => {
                event.preventDefault()
                const name = this.productName.value
                const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                //marketStore.createProduct(name, price);
                marketStore.createProduct(name, price);
              }}>
                <div className="form-group mr-sm-2">
                  <input
                    id="productName"
                    type="text"
                    ref={(input) => { this.productName = input }}
                    className="form-control"
                    placeholder="Product Name"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="productPrice"
                    type="text"
                    ref={(input) => { this.productPrice = input }}
                    className="form-control"
                    placeholder="Product Price"
                    required />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
              </form>
              <p>&nbsp;</p>
              <Grid columns={this.state.columns} divided centered>
                <Grid.Row  centered>
                  <Grid.Column  centered>
                    {this.loadCard(this.product)}
                  </Grid.Column>
                  <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                  </Grid.Column>
                  <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                  </Grid.Column>
                  <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                  </Grid.Column>
                  <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
    );
  }
}

export default CreateProduct;