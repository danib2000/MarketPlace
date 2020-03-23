import UserFetcher from '../fetchers/userFetcher';
import {observable, action, computed} from 'mobx';
import User from '../modules/User';
import LocalStorage from '../localStorage/localStorageUtil'
class CurrentUserStore{
    @observable currentUser;

    constructor(){
        this.currentUser = null;
    }

    @action 
    async initUserFromAPI(){
        const authData = await UserFetcher.getUserFromApi();
        const newUser = new User();
        newUser.id = authData.id;
        newUser.email = authData.email;
        newUser.username = authData.usename;
        this.currentUser = newUser;
    }
    @action 
    async checkIfToken(){
        LocalStorage.getTokenFromLocalStorage().then( (token) =>{
            if(token){
              //currentUserStore.initUserFromAPI();
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
}
//var currentUserStore = new CurrentUserStore;
export default CurrentUserStore;