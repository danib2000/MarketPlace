import React, { Component } from 'react';
import {  Tab } from 'semantic-ui-react'
import {CURRENT_USER_STORE} from '../../../stores/storeKeys';
import rootStores from '../../../stores';
import UserFrom from './userForm';
import { observer } from 'mobx-react';
import SellerForm from './sellerForm';
import ProfileForm from './profileForm';
import { withRouter } from 'react-router-dom';


const currentUserStore = rootStores[CURRENT_USER_STORE];


const panes = [
  { menuItem: 'user information', render: () => <UserFrom/> },
  { menuItem: 'profile information', render: () => <ProfileForm/> },
]
@observer
class Profile extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  addPane() {
    if (currentUserStore.currentUser.role === 'user'){
        panes[2]={ menuItem: 'seller information', render: () => <SellerForm/> };
    }else if(currentUserStore.currentUser.role === 'seller'){
      panes[2]={ menuItem: 'seller information', render: () => <SellerForm/>  };
    }
  }
  componentDidMount(){
    if(!currentUserStore.isUserLoggedIn){
      this.props.history.replace('/');
    }
  }
  render() {
    // const { value } = this.state;
    if(currentUserStore.currentUser){
      this.addPane();
    }
    return (
      <Tab panes={panes} style={{marginTop: "82px"}}/>
    )
  }
}

export default withRouter(Profile);
