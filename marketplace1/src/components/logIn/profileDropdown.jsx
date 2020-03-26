import React, { Component } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react'
import {AUTH_STORE, CURRENT_USER_STORE} from '../../stores/storeKeys';
import rootStores from '../../stores';
import { reaction } from 'mobx';
import { withRouter } from 'react-router-dom';

const currentUserStore = rootStores[CURRENT_USER_STORE];
class ProfileDropDown extends Component{
     profileOptions = [
        {
            key: 'user',
            text: (
              <span>
                Signed in as <strong>{/*currentUserStore.currentUser.userName*/}</strong>
              </span>
            ),
            disabled: true,
        },
        { key: 'profile', text: 'Your Profile', onclick: () => {this.props.history.push('/profile')}},
        { key: 'upload a product', text: 'upload a product' },
        { key: 'help', text: 'Help' },
        { key: 'settings', text: 'Settings', onClick: () => {this.props.history.push('/settings')}},
        { key: 'sign-out', text: 'Sign Out', onClick: this.signOut() },
    ];
     trigger = (
      <span>
        <Icon name='user' /> Hello, Bob
      </span>
    )
    signOut(){
      //TO DO add a signout function
      alert('asd');
    }
      render(){
        return <Dropdown trigger={this.trigger} options={this.profileOptions} style={{}}/> 
      }
 
}
export default withRouter(ProfileDropDown);
