import {observable, action} from 'mobx';
import CurrentUserStore from './CurrentUserStore'
import UserFetcher from '../fetchers/userFetcher';
class AuthStore{
    currentUserStore;
    constructor(CurrentUserStore){
        this.currentUserStore = CurrentUserStore;
    }

    async authenticationLogIn(userName, password){
        UserFetcher.authenticationLogIn(userName, password);
    }

}
export default AuthStore;