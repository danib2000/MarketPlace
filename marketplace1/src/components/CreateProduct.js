import React, { Component } from 'react';
import rootStore from '../stores';
import {MARKET_STORE, CURRENT_USER_STORE} from '../stores/storeKeys';
import { Grid, Image, Card, Button, Input, Label } from 'semantic-ui-react'
import Product from '../modules/Product'
import { observer } from 'mobx-react';
const marketStore = rootStore[MARKET_STORE];
const currentUserStore = rootStore[CURRENT_USER_STORE];
@observer
class CreateProduct extends Component {
    state = {
      columns:3,
      productCount:0,
      loading:true,
      productError:[]
  };

  componentDidMount(){
    this.setState({loading:false});
  }
  buyProduct(product){
    if(product.quantity && currentUserStore.isUserLoggedIn){
      marketStore.purchaseProduct(product);
    }else{
      const list = [...this.state.productError];
      list[product.blockChainId]=true;
      this.setState({productError:list});
    }
    console.log(product);

    //marketStore.productsDB.push(this.product);
    //marketStore.purchaseProduct();
  }
  loadCard(product){
    return <Card style={{width:'400px'}} >
            <Image src={"http://localhost:3001/" + product.imgPath} style={{width: '390px', height: '300px'}}  ui={false} className='card-image'/>
            <Card.Content>
              <Card.Header
              textAlign='center'>{product.name}</Card.Header>
              <Card.Description textAlign='center'>
                {product.description}
              </Card.Description>
              <Card.Content className='lower-content' >
                priceETH:{product.priceEth}Ξ<br/>
                <span> priceUSD:{product.priceUSD}$</span><br/>
                Available Stock:{product.blockChainStock}
              </Card.Content>
              {product.blockChainStock >0 ?
                  <div>
                    <Input error={this.state.productError[product.blockChainId]} label={{ basic: true, content: 'quantity' }}  type='number' min='1' max={product.blockChainStock} onChange={(e)=>{product.quantity = e.target.value}}/>
                    <Button style={{right: 0,position: 'absolute'}}onClick={this.buyProduct.bind(this, product)}>Buy Now</Button>
                  </div>:
                  <div>
                    <br/>
                    <Label color='red' attached='bottom'>Item is out of Stock</Label>
                  </div>}
            </Card.Content>
          </Card>
  }
  loadGrid(){
    var result = [];
    console.log(marketStore.productsBlockChain);
    var amount = marketStore.productsDB.length;
    for(var i = 0;i<amount;i=i+3){
      result.push(<Grid.Row key={i} centered>
                    <Grid.Column >
                      {marketStore.productsDB[i] ? this.loadCard(marketStore.productsDB[i]):null}
                    </Grid.Column>
                    <Grid.Column>
                    {marketStore.productsDB[i+1] ? this.loadCard(marketStore.productsDB[i+1]):null}
                    </Grid.Column>
                    <Grid.Column>
                    {marketStore.productsDB[i+2] ? this.loadCard(marketStore.productsDB[i+2]):null}
                    </Grid.Column>
                  </Grid.Row>);
    }
    return result;
  }
  product = new Product('iphone','Smart phone from apple','1.5','650','iphone.jpeg');
  render() {
    if(this.state.loading){
      return(<div>loading......</div>)
    }else 
    {
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
                {this.loadGrid()}
              </Grid>
            </div>
    );
  }
}
}

export default CreateProduct;