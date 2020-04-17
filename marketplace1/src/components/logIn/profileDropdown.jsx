import React, { Component } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react'
import {CURRENT_USER_STORE} from '../../stores/storeKeys';
import rootStores from '../../stores';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import NotificationDropDown from './notificationDropdown';

const currentUserStore = rootStores[CURRENT_USER_STORE];
@observer
class ProfileDropDown extends Component{
     profileOptions = [
        {
            key: 'user',
            text: (
              <span>
                Signed in as <strong>{currentUserStore.currentUser.userName}</strong>
              </span>
            ),
            disabled: true,
        },
        { key: 'profile', text: 'Your Profile', onClick: () => {this.props.history.push('/profile')}},
        { key: 'upload a product', text: 'upload a product' },
        { key: 'help', text: 'Help' },
        { key: 'settings', text: 'Settings', onClick: () => {this.props.history.push('/settings')}},
        { key: 'sign-out', text: 'Sign Out', onClick:() => {this.signOut()} },
    ];
     trigger = (
      <span>
        <Icon name='user' /> Hello, {currentUserStore.currentUser.userName}
      </span>
    )
    signOut(){
      currentUserStore.logOut();      
      this.props.history.replace('/');
    }
      render(){

        return (<div>
          <NotificationDropDown />
          <Dropdown trigger={this.trigger} options={this.profileOptions} style={{}}/>
          </div>
         )
      }
 
}
export default withRouter(ProfileDropDown);
