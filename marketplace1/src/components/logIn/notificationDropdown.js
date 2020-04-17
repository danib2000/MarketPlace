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
        console.log(notificationStore);
        console.log( notificationStore.notifications[0]);
        notificationStore.notifications.forEach(notification => {
            console.log(notification);
            console.log('asd');
            if(notification.type ==='seller info')
            {
                console.log('asd');
                this.notifications.push({
                    key: notification.type,
                    text: notification.info + ' - by the user: ' + notification.sellerInfo.userName
                });
            }
            
        });
    }     
    componentWillMount(){
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