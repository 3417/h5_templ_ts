
import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
// 可以定义多个不同类型的store
export const useStore = defineStore('main', {
    state:()=>{
        return{
            isLoading:false
        }
    },
    getters:{
        cloading:(state)=> state.isLoading
    },
    actions:{
        // 同步或者异步的操作都可以写在这
        SET_LOADING(data:boolean){
            this.isLoading = data;
        }
    }
})