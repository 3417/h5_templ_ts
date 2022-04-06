
import { createStore } from 'vuex';
const store = createStore({
    state() {
        return {
            isLoading:false
        }
    },
    mutations: {
        SET_LOADING(state:any,data) {
            state.isLoading = data;
        }
    }
})


export default store;