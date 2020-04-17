import UserFetcher from '../fetchers/userFetcher';
import {observable, action, computed} from 'mobx';
import User from '../modules/User';
import LocalStorage from '../localStorage/localStorageUtil'
class CurrentUserStore{
    @observable currentUser;
    notificationStore;

    constructor(notificationStore){
        this.currentUser = null;
        this.errorMessage = null;
        this.notificationStore = notificationStore;
    }

    @action 
    async initUserFromAPI(){
        this.errorMessage = null;
        const authData = await UserFetcher.getUserFromApi();
        const newUser = new User();
        newUser.id = authData.id;
        newUser.email = authData.email;
        newUser.userName = authData.userName;
        newUser.role = authData.role;
        newUser.address = authData.address;
        newUser.city = authData.city;
        newUser.region = authData.region;
        newUser.secondAddress = authData.secondaddress;
        newUser.secondCity = authData.secondcity;
        newUser.secondRegion = authData.secondregion;
        newUser.walletAddress = authData.walletAddress;
        newUser.infoAboutUser = authData.about;
        newUser.country = authData.country;
        newUser.notification = authData.notification;
        this.currentUser = newUser;
        if(this.currentUser.notification>0){
          await this.notificationStore.getAllNotifications();
        }
    }
    @action 
    async checkIfToken(){
        LocalStorage.getTokenFromLocalStorage().then( (token) =>{
            if(token){
              this.initUserFromAPI();
              console.log(this.currentUser);
            }
          }).catch((err) => {
            console.log(err.message);
          });
    }
    @computed
    get isUserLoggedIn(){
        return this.currentUser != null;
    }
    @action
    logOut(){
      LocalStorage.clearTokenFromLocalStorage();
      this.errorMessage = null;
      this.currentUser = null;
    }
}
export default CurrentUserStore;