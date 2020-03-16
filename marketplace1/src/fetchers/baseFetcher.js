import axios from 'axios';

class BaseFetcher{
    static baseUrl = 'http://localhost:3001';

    static async httpget(url){
        return await axios.get(baseUrl + url);
    }
    static async httpPost(url , body){
        return await axios.post(this.baseUrl, body)
    }

}

export default BaseFetcher;