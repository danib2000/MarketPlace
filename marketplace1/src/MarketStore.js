import {observable} from 'mobx'
class MarketStore{
    @observable products =[];
    @observable a = "";
}

var store = window.store = new MarketStore;

export default store;