import UserFetcher from '../fetchers/userFetcher';
import {observable, action} from 'mobx';

class NotificationStore{
    @observable notifications;
    constructor(){
        this.notifications = [];
    }
    @action
    async getAllNotifications(){
        await  UserFetcher.getAllNotifications().then((authData)=>{
            authData.data.ans.forEach(notification => {
                this.notifications.push(notification);
                //console.log(authData.data.ans[0]);
            });
        });
        
        
        //console.log(this.notifications[0].sellerInfo.userName);
    }
    @action 
    async createNotification(info, type, notifyAdmin, userToNotify){
      UserFetcher.postNotification(info, type, notifyAdmin, userToNotify);
    }
    @action
    async updateNotification(id, newType, newMessage){
        await UserFetcher.updateNotification(id,newType,newMessage);
        this.cleanStore();
        await this.getAllNotifications().then(()=>{
            console.log('yay');
        });
    }
    cleanStore(){
        this.notifications = [];
    }
}
export default NotificationStore;