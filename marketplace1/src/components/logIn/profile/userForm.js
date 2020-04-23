import React, { Component } from 'react';
import { Form, Divider, Input, Header, Message } from 'semantic-ui-react'
import {CURRENT_USER_STORE} from '../../../stores/storeKeys';
import rootStores from '../../../stores';
import userFetcher from '../../../fetchers/userFetcher';
import AlertUtils from '../../../AlertUtils';
import LocalStorage from '../../../localStorage/localStorageUtil';

const currentUserStore = rootStores[CURRENT_USER_STORE];

class UserForm extends Component{
    state = {
        email:"",
        confirmEmail:"",
        password:"",
        newPassowrd:"",
        confirmPassword:"",
        mailerror:false,
        mailloading:false,
        passworderror:false,
        passwordLoading:false,
        oldPassDoesntMatch:false
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
            console.log('asd');
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
    render(){
        return(
            <div className='Forms' style={{margin: "10px"}}>
                <Header size='medium'>Change email</Header>
            <Form error={this.state.mailerror} onSubmit={this.onSubmitMail} loading={this.state.mailloading}>
                <Form.Group>
                    <Form.Field required 
                                width={4}
                                id='form-input-control-email'
                                control={Input}
                                type='email'
                                label='email'
                                placeholder='email'
                                onChange={(e)=> {this.setState({email: e.target.value, mailerror:false})}}
                            />  
                    <Form.Field required
                                width={4}
                                id='form-input-control-confirmEmail'
                                control={Input}
                                type='email'
                                label='confirm email'
                                placeholder='confirm email'
    
                                onChange={(e)=> {this.setState({confirmEmail: e.target.value,  mailerror:false})}}
                            />
                </Form.Group>
                <Message
                    error
                    header='mail doesnt match'
                    content='please enter your new mail again'
                />
            <Form.Button>Submit</Form.Button>
            </Form>
            <Divider />
            <Header size='medium'>Change password</Header>
            <Form style={{marginTop: "10px"}} onSubmit={this.onSubmitPassword} 
            loading={this.state.passwordLoading} error={this.state.passworderror}>
                <Message
                    error
                    header='passwords do not match'
                    content='please enter your new password again'
                />
            <Form.Field required 
                                width={4}
                                id='form-input-control-oldPassword'
                                control={Input}
                                type='password'
                                label='old password'
                                placeholder='old password'
                                onChange={(e)=> {this.setState({password: e.target.value, oldPassDoesntMatch:false})}}
                            />
            <Form.Group>
                    <Form.Field required 
                                width={4}
                                id='form-input-control-newPassword'
                                control={Input}
                                type='password'
                                label='new password'
                                placeholder='new password'
                                onChange={(e)=> {this.setState({newPassowrd: e.target.value, passworderror:false})}}
                            />
                    <Form.Field required
                                width={4}
                                id='form-input-control-confirmPassword'
                                control={Input}
                                type='password'
                                label='confirm password'
                                placeholder='confirm password'
                                onChange={(e)=> {this.setState({confirmPassword: e.target.value, passworderror:false})}}
                            />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
                <div>
                    <Message
                        error
                        header = "your old password is inccorect"
                        message= "please try again"
                        visible={this.state.oldPassDoesntMatch}
                    />
                </div>
            </Form>
            
            </div>
        );
    }
}
export default UserForm;