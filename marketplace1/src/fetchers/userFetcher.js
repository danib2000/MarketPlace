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
    static async postSeller( userName, newRole, address, city, region, secondAddress, secondCity, secondRegion, walletAddress, infoAboutUser, country){
        return await this.httpPost(this.routerBaseUrl + '/update', {
            userName      :userName,
            role          : newRole,
            address       : address,
            city          : city,
            region        : region,  
            secondAddress : secondAddress,
            secondCity    : secondCity,
            secondRegion  : secondRegion,
            walletAddress : walletAddress,
            infoAboutUser : infoAboutUser,
            country       : country,
            isSeller      : true});
    }
}
export default UserFetcher;