
class LocalStorage{
    //local storage keys
    static fields = {
        token:'token',

    };
    //clear all 
    static clearAll(){
        localStorage.clear();
    }

    //read local storage
    static async getTokenFromLocalStorage(){
        try{
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem(this.fields.token);
                if(typeof token !== 'undefined'){
                    resolve(token);
                }else{
                    reject(new Error('token is undefiend!'));
                }
               
            });
        } catch(err){
            throw new Error(err.message);
        }
    }

    //write local storage
    static writeToLocalStorage(token){
        try {
            return new Promise((resolve,reject) =>{
                localStorage.setItem(this.fields.token, token);
                resolve();
            });
        }catch(err){
            throw new Error(err.message);
        }
    }

}
export default LocalStorage;
