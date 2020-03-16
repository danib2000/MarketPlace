import userFetcher from '../fetchers/userFetcher';
import {observable, action, computed} from 'mobx';
import User from '../modules/User'
class CurrentUserStore{
    @observable currentUser;

    constructor(){
        this.currentUser = null;
    }

    @computed
    get isUserLoggedIn(){
        return this.currentUser != null;
    }
}

export default CurrentUserStore;