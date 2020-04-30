import axios from 'axios';
import BaseFetcher from './baseFetcher';

class ImgFetcher extends BaseFetcher{
    static routerBaseUrl = '/image';
    

    static async getImageById(id){
        return await axios.get(this.baseUrl + '/image/' + id, {headers:{
            'Authorization':'Client-ID ac0c36de7ecf09c'
        }} );
    }
    static async postImage(img){
       return await this.httpPost('/image',img, {headers: {
        'Content-Type': 'multipart/form-data'}
      });
}
   
}
export default ImgFetcher;
