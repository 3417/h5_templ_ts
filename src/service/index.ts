import axios,{AxiosRequestConfig} from 'axios';
import { Toast } from 'vant';
const baseUrl = import.meta.env.VITE_APP_BASE_API;
// interface  pendingType {
//     url:string,
//     params?:any,
//     data?:any,
//     baseURL?:string,
//     oConfig?:object
// }
// 封装axios请求
class httpRequest {
    baseUrl: string
    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || ''
    }
    getInsideConfig(): object {
        let config = {
            baseURL: baseUrl,
            timeout: 50 * 1000,
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            }
        }
        return config;
    }
    interceptors(instance: any, url: string) {
        instance.interceptors.request.use((config:any) => {
            config.headers['RefererRedirectURL'] = location.href;
            config.headers['RefererRedirect'] = '<Name>'
            return config
        },(error:any) => {
            return Promise.reject(error)
        })

        instance.interceptors.response.use((resp:any) => {
            const rCode = resp.data.code || resp.data.code == 0 ? resp.data.code : resp.data.errCode
            if(rCode === 302){
                location.href = resp.data.msg;
            }else if(rCode === 0){
                return resp.data;
            }else {
                Toast(resp.data.msg);
                return Promise.reject(resp.data);
            } 
        },(error:any) => {
            Toast(error.toString());
            return Promise.reject(error);
        })
    }
    request(options: any) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url);
        return instance(options)
    }
}
let _https:any = new httpRequest(baseUrl);
// 封装常用的请求get-post
const get = (url:string,params?:any,oConfig?:any) => {
    return _https.request({
        url,
        method:'get',
        params,
        ...oConfig
    })
}
const post = (url:string,data?:any,oConfig?:any) => {
    return _https.request({
        url,
        method:'post',
        data,
        ...oConfig
    })
}

// 导出
export default {get, post}


