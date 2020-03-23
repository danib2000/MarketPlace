import baseFetcher from './baseFetcher';

class UserFetcher extends baseFetcher{
    static routerBaseUrl = '/customer';
    static async getUsers(){
        return await this.httpget(this.routerBaseUrl + '/getAllCustomers');
    }
    static async getUserFromApi(){
        return await (await this.httpget(this.routerBaseUrl + '/getCustomer')).data;
    }
    static async authenticationLogIn(userName, password){
        return await await this.httpPost(this.routerBaseUrl + '/authenticate', {userName:userName , password:password});
    }
    static async postCustomer(userName, password, email, role){
        return await this.httpPost(this.routerBaseUrl + '/create', {userName:userName , password:password, email:email, role:role});
    }

}
export default UserFetcher;