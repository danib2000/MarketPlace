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
        password:"",
        priceInEth:0,
        priceInUSD:0,
        formDisabled:false,
        loading:false,
        selectedFile: null
    };
    onSubmitMail = ()=>{
        if(this.state.email === this.state.confirmEmail){
            this.setState({mailloading:true});
            userFetcher.postNewEmail(this.state.email).then((res)=>{
                LocalStorage.writeToLocalStorage(res.data.token);
                this.setState({mailloading:false});
            }).catch(err =>{
                console.log(err);
                this.setState({mailloading:false});
            })
        }else{
            this.setState({mailerror:true});
        }
    }
    onSubmitPassword = ()=>{
        if(this.state.newPassowrd === this.state.confirmPassword){
            this.setState({passwordLoading:true});
            userFetcher.postNewPassword(this.state.password, this.state.newPassowrd).then(res =>{
                LocalStorage.writeToLocalStorage(res.data.token);
                this.setState({passwordLoading:false});
            }).catch(err=>{
                this.setState({passwordLoading:false});
                this.setState({oldPassDoesntMatch: !this.state.oldPassDoesntMatch});
                console.log(err);
            })
        }else{
            this.setState({passworderror:true});
        }
    }
    onUpload(){
        console.log(this.state.selectedFile);
        const data = new FormData()
        data.append('file', this.state.selectedFile, 'ttt.jpg');
        ImageFetcher.postImage(data);
    }
    onChangeHandler=(event)=>{
        console.log(event.target.files);
        this.setState({
            selectedFile:event.target.files[0]
        }, () => {
            console.log(this.state);
        })
    }
    componentDidMount(){
        if(currentUserStore.currentUser.role !== 'seller' || currentUserStore.currentUser.role !== 'admin' ){
            //fire alert
            console.log('asd');
            this.setState({formDisabled:true});
        }
    }
    render(){
        return(
            <div className='Forms' style={{margin: "10px"}}>
                <Header size='medium'>Product Details</Header>
            <Form onSubmit={this.onSubmitMail} loading={this.state.loading} disabled={this.state.formDisabled}>
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
                                    width={2}
                                    id='form-input-control-priceEth'
                                    control={Input}
                                    label='Price in ETH'
                                    type='number'
                                    value={this.state.priceInEth}
                                    placeholder='Ξ'
                                    onChange={(e)=> {this.setState({priceInEth: e.target.value, 
                                                    priceInUSD: e.target.value * marketStore.usdPrice})}}
                                /> 
                    <Form.Field required 
                                    width={2}
                                    id='form-input-control-priceUSD'
                                    control={Input}
                                    type='number'
                                    value={this.state.priceInUSD}
                                    label='Price in USD'
                                    placeholder='$'
                                    onChange={(e)=> {this.setState({priceInUSD: e.target.value,
                                                        priceInEth:e.target.value / marketStore.usdPrice})}}
                                />
                </Form.Group>
            <Form.Button disabled={this.state.formDisabled}>Submit</Form.Button>
            </Form>            
            <Form onSubmit={this.onUpload.bind(this)}>
                 <input type="file" name="file" onChange={this.onChangeHandler.bind(this)}/>
                <Form.Button>Submit</Form.Button>

            </Form>

            </div>
        );
    }
}
export default ProductUpload;