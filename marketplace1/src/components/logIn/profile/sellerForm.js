import React, { Component } from 'react';
import { Form, Input} from 'semantic-ui-react'
import {CURRENT_USER_STORE, NOTIFICATION_STORE} from '../../../stores/storeKeys';
import rootStores from '../../../stores';
import userFetcher from '../../../fetchers/userFetcher';
import AlertUtils from '../../../AlertUtils';
import LocalStorage from '../../../localStorage/localStorageUtil';

const options = [
    { key: 'IL', text: 'Israel', value: 'Israel' },
    { key: 'USA', text: 'United States', value: 'United States' },
    { key: 'IN', text: 'India', value: 'India' },
    { key: 'RU', text: 'Russia', value:'Russia'},
    { key: 'o', text: 'Other', value: 'other' },
]

const currentUserStore = rootStores[CURRENT_USER_STORE];
const notificationStore = rootStores[NOTIFICATION_STORE];
class SellerForm extends Component{
    state = {
        address: "",
        city: "",
        region: "",
        country:"",
        secondaddress:"",
        secondregion:"", 
        secondcity:"", 
        about: "",
        termsChecked:false,
        walletAddress: "",
        firstSubmit: true,
        createNotification: true
    };
    
    handleChange = (e, { value }) => this.setState({ value })
    renderOther = ()=>{
        if(this.state.country==='other'){
            return  <Form.Field required style={{margin: "16px"}} width={4}
            label='Other Country'
            placeholder='Country'
            control={Input}
        />
        }
    }
    handleSubmit = () =>{
        if(this.state.firstSubmit){
            AlertUtils.showGeneralSuccessPopUp('are you sure you filled all the fields correctly?',true ,'I want to check again','question')
            .then((result) => {
                if(result.value){
                this.sendSellerInfoToAPI();  
                }
                if(result.dismiss){
                    this.setState({firstSubmit:false})
                }
            });
        }
        else{
            this.sendSellerInfoToAPI();

        }
    }
    sendSellerInfoToAPI(){
        //set the user params that were entered
        currentUserStore.currentUser.city = this.state.city;
        currentUserStore.currentUser.region = this.state.region;
        currentUserStore.currentUser.secondaddress = this.state.secondAddress;
        currentUserStore.currentUser.secondcity = this.state.secondCity;
        currentUserStore.currentUser.secondregion = this.state.secondRegion;
        currentUserStore.currentUser.walletAddress = this.state.walletAddress;
        currentUserStore.currentUser.about = this.state.infoAboutUser;
        currentUserStore.currentUser.country = this.state.country;
        if(this.state.createNotification){
            notificationStore.createNotification('New seller info','seller info', true, null);
        }
        //send info to api db
        userFetcher.postSeller(currentUserStore.currentUser.userName, 
            "user",
            this.state.address,
            this.state.city,
            this.state.region,
            this.state.secondaddress,
            this.state.secondcity,
            this.state.secondregion,
            this.state.walletAddress,
            this.state.about,
            this.state.country).then((res) =>{
                console.log(res.data);
                LocalStorage.writeToLocalStorage(res.data.token);
                AlertUtils.showGeneralSuccessPopUp("Your information has been submited! An admin will check it", true, "", 'success');
            });
    }
    componentDidMount(){
        this.setState({
            address: currentUserStore.currentUser.address,
            region : currentUserStore.currentUser.region,
            city: currentUserStore.currentUser.city,
            secondAddress: currentUserStore.currentUser.secondAddress,
            secondCity : currentUserStore.currentUser.secondCity,
            secondRegion : currentUserStore.currentUser.secondRegion,
            walletAddress : currentUserStore.currentUser.walletAddress,
            about: currentUserStore.currentUser.infoAboutUser,
            country : currentUserStore.currentUser.country
        });
        if(currentUserStore.currentUser.address || currentUserStore.currentUser.role ==='admin'){
            this.setState({
                createNotification:false
            });
        }
        if(currentUserStore.currentUser.role ==='rejectedSeller'){
            this.setState({
                createNotification:true
            });
        }
    }
    render(){
    // const { value } = this.state;
        return(
            <Form style={{margin: "10px"}}  onSubmit={this.handleSubmit} >
                <Form.Group>
                    <Form.Field required 
                        width={3}
                        value={this.state.address}
                        id='form-input-control-address'
                        control={Input}
                        label='Address'
                        placeholder='Address'
                        onChange={(e)=> {this.setState({address: e.target.value})}}
                    />
                    <Form.Field required
                        width={3}
                        value={this.state.city}
                        id='form-input-control-city'
                        control={Input}
                        label='city'
                        placeholder='city'
                        content='asd'
                        onChange={(e)=> {this.setState({city: e.target.value})}}
                    />
                    <Form.Field required
                        value={this.state.region}
                        id='form-input-control-region'
                        width={3}
                        control={Input}
                        label='region'
                        placeholder='region'
                        onChange={(e)=> {this.setState({region: e.target.value})}}

                    />
                </Form.Group>
                <Form.Group>
                    <Form.Field  
                        width={3}
                        value={this.state.secondaddress}
                        id='form-input-control-address2'
                        control={Input}
                        label='Second address (optional)'
                        placeholder='Address'
                        onChange={(e)=> {this.setState({secondaddress: e.target.value})}}
                    />
                    <Form.Field 
                        width={3}
                        value={this.state.secondcity}
                        id='form-input-control-city2'
                        control={Input}
                        label='Second city (optional)'
                        placeholder='City'
                        onChange={(e, )=> {this.setState({secondcity: e.target.value})}}
                    />
                    <Form.Field 
                        id='form-input-control-region2'
                        value={this.state.secondregion}
                        width={3}
                        control={Input}
                        label='Second region (optional)'
                        placeholder='Region'
                        onChange={(e)=> {this.setState({secondregion: e.target.value})}}

                    />
                </Form.Group>
                <Form.Group>
                <Form.Select required
                    fluid
                    label='Country'
                    options={options}
                    placeholder='Country'
                    onChange={(e ,{value})=> {this.setState({country: {value}.value})}}
                    style={{margin: "20px"}}     
                    defaultValue={currentUserStore.currentUser.country} 
                />
                {this.renderOther()}
                </Form.Group>
                <Form.Field
                    required
                    value={this.state.walletAddress}
                    label='Wallet address'
                    width={6}
                    control={Input}
                    placeholder='Wallet address'
                    onChange={(e)=> {this.setState({walletAddress: e.target.value})}}


                />
                <Form.TextArea 
                    label='About' 
                    value={this.state.about}
                    placeholder='Tell us more about you...' 
                    onChange={(e)=> {this.setState({about: e.target.value})}}
                />
                <Form.Checkbox required 
                label='I agree to the Terms and Conditions' 
                onClick={()=>{this.setState({termsChecked:!this.state.termsChecked})}}
                />
                <Form.Button type="submit" disabled={!this.state.termsChecked} >Submit</Form.Button>
            </Form>
        );
    }
}
export default SellerForm;