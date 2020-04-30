import baseFetcher from './baseFetcher';

class UserFetcher extends baseFetcher{
    static routerBaseUrl = '/customer';
    static async getUsers(){
        return await this.httpget(this.routerBaseUrl + '/getAllCustomers');
    }
    static async getUserFromApi(){
        return await (await this.httpget(this.routerBaseUrl + '/getCustomer')).data;
    }
    static async getAllNotifications(){
        return await await this.httpget(this.routerBaseUrl+ '/getNotification');
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
    static async postNotification(info, type, notifyAdmin, userToNotify){
        return await this.httpPost(this.routerBaseUrl + '/newNotification', {info:info, type:type, notifyAdmin:notifyAdmin, userToNotify:userToNotify});
    }
    static async postResetMail(userName,){
        return await this.httpPost(this.routerBaseUrl + '/sendResetMail', {userName:userName});
    }
    static async postResetCodeAndPass(userName, code, password){
        return await this.httpPost(this.routerBaseUrl + '/validateCode', {userName:userName, code:code, password:password});
    }
    static async postNewEmail(newEmail){
        return await this.httpPost(this.routerBaseUrl + '/update', {isEmail:true, newEmail:newEmail});
    }
    static async postNewPassword(oldPassword, newPassword){
        return await this.httpPost(this.routerBaseUrl + '/update', {isPassword:true, oldPassword:oldPassword, newPassword:newPassword});
    }
    static async updateNotification(id, newType, newMessge){
        console.log(id);
        return await this.httpPost(this.routerBaseUrl + '/update', {id:id, newType:newType, newMessge:newMessge, isNotification:true});
    }
    static async updateRole(userName, newRole){
        return await this.httpPost(this.routerBaseUrl + '/update', {userName:userName, newRole:newRole, updateRole:true});
    }
}
export default UserFetcher;