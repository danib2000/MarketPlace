import React, { Component } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react'
import {CURRENT_USER_STORE, NOTIFICATION_STORE} from '../../stores/storeKeys';
import rootStores from '../../stores';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

const currentUserStore = rootStores[CURRENT_USER_STORE];
const notificationStore = rootStores[NOTIFICATION_STORE];

@observer
class NotificationDropDown extends Component{
    state={}
    notifications = [
        {
            key: 'amount',
           
            text: (
              <span>
                  
                New Notifications: <strong>{currentUserStore.currentUser.notification}</strong>
              </span>
              
            ),
            disabled: true,
        },
        
    ];
 
    trigger = (
      
        <span style ={{'margin':'20px'}}>
            <Icon name='bell outline' />

          {(currentUserStore.currentUser.notification > 0)?
            <span style={{'color': 'red', 'fontSize':'16px', 'position':'absolute'} }>{currentUserStore.currentUser.notification}</span>:
            <span></span>}
        
        </span>
    )
    pushNotifications(){
        this.sleep(500).then(() => {
        notificationStore.notifications.forEach(notification => {
            if(notification.isNewNotification === true){
            if(notification.type ==='seller info')
            {
                this.notifications.push({
                    key: notification.type + this.state.i ,
                    text: notification.type + ' - by the user: ' + notification.sellerInfo.userName,
                    onClick: () => {this.props.history.push('/profile/notifications')}
                });
                this.setState({i:this.state.i+1});
            }else{
                this.notifications.push({
                    key: notification.type + this.state.i ,
                    text: notification.type,
                    onClick: () => {this.props.history.push('/profile/notifications')}
                });
                this.setState({i:this.state.i+1});
            }
        }
        });
    });
    }   
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }  
    componentDidMount(){
        this.setState({i: 0});
            if((currentUserStore.currentUser.notification > 0)){            
                this.notifications[0].text=<span>   
                    New Notifications: <strong>{currentUserStore.currentUser.notification}</strong>
                    </span>;
                this.pushNotifications();
            }else{
                this.notifications[0].text=<span>
                No New Notifications
              </span>
              
            }
        
        
    }   
    render(){
            
        return <Dropdown icon={null} trigger={this.trigger} options={this.notifications} style={{}}/> 
      
        
      }
 
}
export default withRouter(NotificationDropDown);