import React, { Component } from 'react';
import { Form, Divider, Input, Header, Message } from 'semantic-ui-react'
import {CURRENT_USER_STORE,MARKET_STORE} from '../../../stores/storeKeys';
import rootStores from '../../../stores';
import userFetcher from '../../../fetchers/userFetcher';
import AlertUtils from '../../../AlertUtils';
import LocalStorage from '../../../localStorage/localStorageUtil';
import ImageFetcher from '../../../fetchers/imgFetcher'

const currentUserStore = rootStores[CURRENT_USER_STORE];
const marketStore = rootStores[MARKET_STORE];
class ProductUpload extends Component{
    state = {
        name:"",
        description:"",
        priceInEth:0,
        priceInUSD:0,
        stock:0,
        formDisabled:false,
        loading:false,
        selectedFile: null
    };
    onSubmitProduct = ()=>{
        //uploads img to api
        this.setState({loading:true});
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.name);
        ImageFetcher.postImage(data);
        const path = this.state.name + '.' +this.state.selectedFile.type.split('/')[1];
        //uploads product to db
        marketStore.createProduct(this.state.name,this.state.description,this.state.priceInUSD,this.state.priceInEth, path, this.state.stock)
        .then(()=>{
            console.log('uploaded');
            this.setState({loading:false});
            //TODO fire alert
        });
    }

    onUpload(){
        console.log(this.state.selectedFile.type.split('/')[1]);
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.name);
       // ImageFetcher.postImage(data);
    }
    onChangeHandler=(event)=>{
        this.setState({
            selectedFile:event.target.files[0]
        }, () => {
            console.log(this.state);
        })
    }
    componentDidMount(){
        if(currentUserStore.currentUser.role !== 'seller' || currentUserStore.currentUser.role !== 'admin' ){
            //TODO fire alert
            this.setState({formDisabled:true});
        }
    }
    render(){
        return(
            <div className='Forms' style={{margin: "10px"}}>
                <Header size='medium'>Product Details</Header>
            <Form onSubmit={this.onSubmitProduct} loading={this.state.loading} disabled={this.state.formDisabled}>
                    <Form.Field required 
                                width={4}
                                id='form-input-control-name'
                                control={Input}
                                label='name of the product'
                                placeholder='enter name here....'
                                onChange={(e)=> {this.setState({name: e.target.value})}}
                            />  
                    <Form.TextArea required
                                label='Description' 
                                value={this.state.about}
                                placeholder='Tell us more about your product...' 
                                onChange={(e)=> {this.setState({description: e.target.value})}}
                            />
                <Form.Group>
                    <Form.Field required 
                                    width={3}
                                    id='form-input-control-priceEth'
                                    control={Input}
                                    label='Price in ETH'
                                    type='number'
                                    step='0.1'
                                    value={this.state.priceInEth}
                                    placeholder='Ξ'
                                    onChange={(e)=> {this.setState({priceInEth: e.target.value, 
                                                    priceInUSD: e.target.value * marketStore.usdPrice})}}
                                /> 
                    <Form.Field required 
                                    width={3}
                                    id='form-input-control-priceUSD'
                                    control={Input}
                                    type='number'
                                    value={this.state.priceInUSD}
                                    label='Price in USD'
                                    placeholder='$'
                                    onChange={(e)=> {this.setState({priceInUSD: e.target.value,
                                                        priceInEth:e.target.value / marketStore.usdPrice})}}
                                />
                    <Form.Field required 
                                    width={3}
                                    id='form-input-control-stock'
                                    control={Input}
                                    type='number'
                                    value={this.state.stock}
                                    label='Stock'
                                    onChange={(e)=> {this.setState({stock: e.target.value})}}
                                />
                </Form.Group>
                <input type="file" name="file" onChange={this.onChangeHandler.bind(this)}/>
            <Form.Button disabled={!this.state.formDisabled}>Submit</Form.Button>
            </Form>            
            </div>
        );
    }
}
export default ProductUpload;