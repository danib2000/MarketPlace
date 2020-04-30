import {action} from 'mobx';
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
        await UserFetcher.authenticationLogIn(userName, password).then( (res) => {
            if(res.data.token !== null){
                LocalStorage.writeToLocalStorage(res.data.token).then( async () =>{
                    await this.currentUserStore.initUserFromAPI().then(()=>{
                        console.log('done2');
                    });
                });
            }else{
                throw new Error();
            }
        });
        }catch(err){
            console.error(err.message);
            console.log(err.response.data);
            this.currentUserStore.errorMessage = err.response.data.Error;
        }
    }

}
//var authStore = new AuthStore;
export default AuthStore;