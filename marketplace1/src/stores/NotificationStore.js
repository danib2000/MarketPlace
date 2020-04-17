import UserFetcher from '../fetchers/userFetcher';
import {observable, action, computed} from 'mobx';
import notification from '../modules/Notification';

class NotificationStore{
    @observable notifications;
    constructor(){
        this.notifications = [];
    }
    @action
    async getAllNotifications(){
        const authData = await  UserFetcher.getAllNotifications();
        console.log(authData.data.ans[0]);
        authData.data.ans.forEach(notification => {
            this.notifications.push(notification);
        });
        console.log(this.notifications[0].sellerInfo.userName);
    }
    @action 
    async createNotification(info, type, notifyAdmin, userToNotify){
      UserFetcher.postNotification(info, type, notifyAdmin, userToNotify);
    }
    
}
export default NotificationStore;