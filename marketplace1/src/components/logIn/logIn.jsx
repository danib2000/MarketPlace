import React from 'react';
import ReactModalLogin from "react-modal-login";
import {  googleConfig } from "../../social-config";
import '../logIn/logIn.css'
import { Button } from 'semantic-ui-react';
import rootStores from '../../stores';
import {AUTH_STORE, CURRENT_USER_STORE} from '../../stores/storeKeys';
import { observer } from 'mobx-react';
import userFetcher from '../../fetchers/userFetcher';
import ProfileDropDown from './profileDropdown.jsx';
import ImgFetcher from './../../fetchers/imgFetcher'
const authStore = rootStores[AUTH_STORE];
const currentUserStore = rootStores[CURRENT_USER_STORE];

@observer
class SignPage  extends React.Component{

constructor(props)
{
  super(props);
  this.state = {    
    showModal: false,
    loggedIn: null,
    loading: false,
    error: null,
    initialTab: null,
    recoverPasswordSuccess: null,
    loggeduserName : null,
    errorMessage: "",
    userName:""
  }
}


async onLogin() {
  const userName = document.querySelector('#userName').value;
  const password = document.querySelector('#password').value;
  
  if (!userName || !password) {
    this.setState({
      errorMessage:"Username or password are missing",
      error: true
    })
  } else {
      this.startLoading();
        
         await authStore.authenticationLogIn(userName, password).then(async () => {
           this.finishLoading();
          if(currentUserStore.errorMessage && !currentUserStore.isUserLoggedIn){
            this.setState({
              errorMessage:"Authentication failed - Username or password are incorrect",
              error:true
            });
          }else{
            this.onLoginSuccess('form');
          }
        });
    
  }
}

onRegister() {
  const login = document.querySelector('#login').value;
  const userName = document.querySelector('#userName').value;
  const password = document.querySelector('#password').value;

  if (!login || !userName || !password) {
    this.setState({
      errorMessage: "Please fill all of the fields",
      error: true
    })
  } else {
    try{
      this.startLoading();
      userFetcher.postCustomer(userName, password, login, 'user').then(()=>{
        authStore.authenticationLogIn(userName, password);
        this.finishLoading();
        this.onLoginSuccess('form');
      }).catch(err =>{
        this.setState({
          errorMessage:"Duplicate Username - This username has already been taken, please enter a different username",
          error:true
        });
      });
    }catch(err){
      alert(err);
    }
  }
}

async onRecoverPassword() {
  console.log('__onFotgottenPassword__');
  console.log('userName: ' + document.querySelector('#resetUser').value);

  const userName = document.querySelector('#resetUser')
  const code = document.querySelector('#code');
  const pass = document.querySelector('#password');

  //send API call for code
  if(userName.value){
    this.startLoading();
    await userFetcher.postResetMail(userName.value).then((res)=>{
      this.setState({error:null, errorMessage:'', recoverPasswordSuccess: true, userName:userName.value});
      userName.parentElement.className='hidden';
      code.parentElement.className='RML-form-group';
      userName.value='';
      pass.parentElement.className='RML-form-group'
    }).catch(err => {
      this.setState({
        error: true,
        recoverPasswordSuccess: false,
        errorMessage: "The username you entered does'nt exist"
      });
    });
    this.finishLoading();
  }

  //check with api for validation and if valid reset the password
  if(code.value && pass.value)  {
    this.startLoading();
    await userFetcher.postResetCodeAndPass(this.state.userName, code.value, pass.value).then( (res)=>{
      this.setState({error:null, errorMessage:'', recoverPasswordSuccess: true,});
      userName.parentElement.className='hidden';
      code.parentElement.className='hidden';
      pass.parentElement.className='hidden';
      document.querySelector('#recoverPasswordSuccessLabel').innerHTML='Your password was reset, you can now login with your new password!';
      code.value='';
    }).catch(err =>{
      this.setState({
        error: true,
        recoverPasswordSuccess: false,
        errorMessage: "The code is inccorect!"
      });
    })
    this.finishLoading();
  }

  console.log(this.state);

}

openModal(initialTab) {
  this.setState({
    initialTab: initialTab
  }, () => {
    this.setState({
      showModal: true,
    })
  });
}

onLoginSuccess(method, response) {
  this.closeModal();
  currentUserStore.errorMessage=null;
  //AlertUtils.showLogInpopUp();
  this.setState({
    loggedIn: method,
    loading: false
  })
  
}

onLoginFail(method, response) {

  this.setState({
    loading: false,
    error: response
  })
}

startLoading() {
  this.setState({
    loading: true
  })
}

finishLoading() {
  this.setState({
    loading: false
  })
}

afterTabsChange() {
  this.setState({
    error: null,
    recoverPasswordSuccess: false,
  });
}

closeModal() {
  this.setState({
    showModal: false,
    error: null,
    loading: false
  });
}

render(){
  const isLoading = this.state.loading;
  return (
    <div>
        {(!currentUserStore.isUserLoggedIn) ?
        <Button className="logInModel" onClick={() => this.openModal()} >Sign In/ Sign Up</Button>
        :
        (<ProfileDropDown/>)
        }
       <ReactModalLogin
        visible={this.state.showModal}
        onCloseModal={this.closeModal.bind(this)}
        loading={isLoading}
        error={this.state.error}
        tabs={{
          afterChange: this.afterTabsChange.bind(this)
        }}
        loginError={{
          label: this.state.errorMessage
        }}
        registerError={{
          label: this.state.errorMessage
        }}
        recoverPasswordError={{
          label:this.state.errorMessage
        }}
        startLoading={() => {this.startLoading()}}
        finishLoading={() => {this.finishLoading()}}
        form={{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),
            onRecoverPassword: this.onRecoverPassword.bind(this),
            
            recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
              ? {
                  label: "Please check your mailbox! a code was send to there",
                  //input: "hasd"
                }
              : null,
            recoverPasswordAnchor: {
              label: "Forgot your password?"
            },
            loginBtn: {
              label: "Sign in"
            },
            registerBtn: {
              label: "Sign up"
            },
            recoverPasswordBtn: {
              label: "Next"
            },
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Username',
                type: 'userName',
                inputClass: 'RML-form-control',
                id: 'userName',
                name: 'userName',
                placeholder: 'Username',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            registerInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email *',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'login',
                name: 'login',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Username *',
                type: 'userName',
                inputClass: 'RML-form-control',
                id: 'userName',
                name: 'userName',
                placeholder: 'Username',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password *',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            recoverPasswordInputs: [
              {
                containerClass: 'RML-form-group2',
                label: 'Username',
                type: 'restUser',
                inputClass: 'RML-form-control',
                id: 'resetUser',
                name: 'resetUser',
                placeholder: 'username',
              },
              {
                containerClass: 'hidden',
                type: 'code',
                label: 'Secret Code',
                inputClass: 'RML-form-control',
                id: 'code',
                name: 'code',
                placeholder: 'Secret Code',
              },
              {
                containerClass: 'hidden',
                type: 'password',
                label: 'Enter your new password here:',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'New Password',
              }
            ],
          }}
          separator={{
            label: "or"
          }}
        providers={{
          // facebook: {
          //   config: facebookConfig,
          //   onLoginSuccess: this.onLoginSuccess.bind(this),
          //   onLoginFail: this.onLoginFail.bind(this),
          //   label: "Continue with Facebook"
          // },
          google: {
            config: googleConfig,
            onLoginSuccess: this.onLoginSuccess.bind(this),
            onLoginFail: this.onLoginFail.bind(this),
            label: "Continue with Google"
          }
        }}
      />
    </div>
  );
}
}
export default SignPage;
