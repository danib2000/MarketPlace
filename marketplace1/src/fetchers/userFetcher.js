import baseFetcher from './baseFetcher';

class UserFetcher extends baseFetcher{
    static routerBaseUrl = '/user';
    static async getUsers(){
        return await this.get(this.routerBaseUrl + '/getAllUsers');
    }
    static async authenticationLogIn(userName, password){
        return await await this.httpPost(this.routerBaseUrl + '/authenticate', {userName:userName , password:password})
    }

}
export default UserFetcher;