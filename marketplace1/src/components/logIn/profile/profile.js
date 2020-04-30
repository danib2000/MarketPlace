import React, { Component } from 'react';
import {  Tab } from 'semantic-ui-react'
import {CURRENT_USER_STORE} from '../../../stores/storeKeys';
import rootStores from '../../../stores';
import UserFrom from './userForm';
import { observer } from 'mobx-react';
import SellerForm from './sellerForm';
import ProfileForm from './profileForm';
import Notifications from './Notifications'
import ProductUpload from './productUpload';
import { withRouter} from 'react-router-dom';


const currentUserStore = rootStores[CURRENT_USER_STORE];


const panes = [
  { menuItem: 'user information', render: () => <UserFrom/> },
  { menuItem: 'profile information', render: () => <ProfileForm/> },
  { menuItem: 'seller information', render: () => <SellerForm/> },
  { menuItem: 'notifications', render: () => <Notifications/> },
  { menuItem: 'Upload Product', render: () => <ProductUpload/> },
]
@observer
class Profile extends Component {
  state = {activeIndex: 0}
  handleTabChange = (e, { activeIndex }) => {this.setState({ activeIndex });}

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
    if(this.props.match.params.id === 'notifications'){
      this.setState({ activeIndex:3 });
    }
    if(this.props.match.params.id === 'uploadProduct'){
      this.setState({ activeIndex:4 });
    }
  }
  render() {
    // const { value } = this.state;
    if(currentUserStore.currentUser){
      //this.addPane();
    }
    const { activeIndex } = this.state;
    return (
      
      <Tab panes={panes} style={{marginTop: "82px"}} activeIndex={activeIndex} onTabChange={this.handleTabChange}/>
    )
  }
}

export default withRouter(Profile);
