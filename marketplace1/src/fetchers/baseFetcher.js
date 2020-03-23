import axios from 'axios';
import LocalStorage from '../localStorage/localStorageUtil'
class BaseFetcher{
    static baseUrl = 'http://localhost:3001';

    static async httpget(url){
        const token = await LocalStorage.getTokenFromLocalStorage();
        const authHeader = {
            Authorization: token ? 'Bearer ' + token : 'undefined',
        };
        return await axios.get(this.baseUrl + url, {headers:authHeader});
    }
    static async httpPost(url , body){
        const token = await LocalStorage.getTokenFromLocalStorage();
        const authHeader = {
            Authorization: token ? 'Bearer ' + token : 'undefined',
        };
        return await axios.post(this.baseUrl + url, body, {headers:authHeader});
    }
    


}

export default BaseFetcher;