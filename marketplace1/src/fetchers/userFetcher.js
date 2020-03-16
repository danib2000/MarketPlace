import baseFetcher from './baseFetcher';

class UserFetcher extends baseFetcher{
    static routerBaseUrl = '/user';
    static async getUsers(){
        return await this.get(this.routerBaseUrl + '/getAllUsers');
    }

}
export default UserFetcher;