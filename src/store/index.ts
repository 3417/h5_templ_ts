
import { createStore } from 'vuex';
const store = createStore({
    state() {
        return {
            voto:{}
        }
    },
    mutations: {
        SET_VOTO(state:any,data) {
            state.voto = data;
        }
    }
})


export default store;