import React, { Component } from 'react';
import rootStore from '../../../stores';
import {MARKET_STORE, CURRENT_USER_STORE} from '../../../stores/storeKeys';
import { Grid, Image, Card, Button, Input, Label } from 'semantic-ui-react'
import Product from '../../../modules/Product';
import { observer } from 'mobx-react';
const marketStore = rootStore[MARKET_STORE];
const currentUserStore = rootStore[CURRENT_USER_STORE];
@observer
class MyProduct extends Component {
    state = {
      columns:3,
      productCount:0,
      loading:true,
      productError:[]
  };

  componentDidMount(){
    this.setState({loading:false});
  }
  updateProduct(product){
    console.log(product);
    marketStore.updateProduct(product);
  }
  loadCard(product){
    return <Card key={product.blockChainId}style={{width:'400px' , margin:'10px'}} >
            <Image src={"http://localhost:3001/" + product.imgPath} style={{width: '390px', height: '300px'}}  ui={false} className='card-image'/>
            <Card.Content>
              <Card.Header textAlign='center'>Current Name:{product.name}<Input type='text' placeholder='new name' onChange={(e)=>{product.name=e.target.value}}/></Card.Header>
              <Card.Description textAlign='center'>Current description:{product.description}
                <br/>
                <Input  size='big' type='text' placeholder='new description' onChange={(e)=>{product.description=e.target.value}}/>
              </Card.Description>
              <Card.Content className='lower-content' >
                current ETH price:{product.priceEth}Ξ <Input type='number'
                                    step='0.1'
                                    min = '0'
                                    placeholder='new ETH price'
                                    onChange={(e)=> {product.priceEth = e.target.value; product.priceUSD = e.target.value * marketStore.usdPrice}}/>
                <br/>
                current USD price:{product.priceUSD}Ξ <br/>
                Current Stock:{product.blockChainStock}<Input type='number' placeholder='new stock' min='0' onChange={(e)=>{product.blockChainStock = e.target.value;}}/>
              </Card.Content>
              <Button onClick={this.updateProduct.bind(this, product)}>Save Product</Button>

            </Card.Content>
          </Card>
  }
  loadProducts(){
      var result = [];
      marketStore.productsDB.forEach(product =>{
          if(product.ownerId.userName === currentUserStore.currentUser.userName){
              result.push(this.loadCard(product));
          }
      })
      return result;
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
  render() {
    if(this.state.loading){
      return(<div>loading......</div>)
    }else 
    {
    return (      
            //   <Grid columns={this.state.columns} divided centered>\
            <div style={{margin:"20px"}}>{this.loadProducts()}</div>
                
            //   </Grid>
    );
  }
}
}

export default MyProduct;