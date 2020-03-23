import {action} from 'mobx';
//import CurrentUserStore from './CurrentUserStore'
import UserFetcher from '../fetchers/userFetcher';
import LocalStorage from '../localStorage/localStorageUtil';
class AuthStore{
    currentUserStore;

    @action
    initStore(currentUserStore){
        this.currentUserStore = currentUserStore;
    }
    @action
    async authenticationLogIn(userName, password){
        try{
        var res = await UserFetcher.authenticationLogIn(userName, password);
        if(res.data.token !== null){
            LocalStorage.writeToLocalStorage(res.data.token).then( () =>{
                this.currentUserStore.initUserFromAPI();
            });
        }else{
            throw new Error()
        }
        }catch(err){
            console.error(err.message);
        }
    }

}
//var authStore = new AuthStore;
export default AuthStore;