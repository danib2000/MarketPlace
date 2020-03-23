import AuthStore from './AuthStore';
import CurrentUserStore from './CurrentUserStore';
import MarketStore from './MarketStore';
import {AUTH_STORE, CURRENT_USER_STORE, MARKET_STORE } from './storeKeys';


/**
 * Initiate all stores
 */
const currentUserStore = new CurrentUserStore();
const authStore = new AuthStore();
authStore.initStore(currentUserStore);
//currentUserStore.checkIfToken();
const marketStore = new MarketStore();

/**
 * Save the instance in global object
 */
const rootStores = {
	[CURRENT_USER_STORE]: currentUserStore,
	[AUTH_STORE]: authStore,
	[MARKET_STORE]: marketStore,
};

export default rootStores;

