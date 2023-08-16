
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
// 全局动态引入图片方法
export const getImageUrl = (url:string):string=>{
    return new URL(`../assets/imgs/${url}`,import.meta.url).href;
}

// 防抖（方法）
const debounce = (fun, delay) =>{
    return function (this:any,..._arg) {
        let that:any = this;
        let _args = _arg;
        clearTimeout(fun.id);
        fun.id = setTimeout(function () {
            fun.call(that, _args);
        }, delay)
    }
}

// 节流(方法)
const throttle = (fun,delay:number=200)=>{
      return function(this:any,...args){
          let that = this,now = +new Date();
          let deferTimer = null;
          if(last && now < last+delay){
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                last = now;
                fun.apply(that,args);
            }, delay);
          }else{
            last = now;
            fun.apply(that,args);
          }
      }
}


// 递归查询树状结构的数据并且保留层级

// 使用方式 eg:
// const newTree = recursion(JSON.parse(JSON.stringify(data)),
//     (node) => {
//         if (node.id && node.id == '5') {
//             return true
//         }
//         return false;
//     }
// )
export const recursion = (nodes, predicate, fn = () => false) => {
    if (!(nodes && nodes.length)) {
        return []
    }
    const newChildren = [];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (fn(node) && predicate(node)) {
            newChildren.push(node);
            continue;
        }
        const subs = recursion(node.children, predicate, fn);
        if ((subs && subs.length) || predicate(node)) {
            node.children = subs || [];
            newChildren.push(node);
        }
    }
    return newChildren.length ? newChildren : []
}


// 微信关闭h5页面
const wxCloseView = () => {
    WeixinJSBridge.call('closeWindow');
}
export const wxClosePage = () => {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', wxCloseView, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', wxCloseView);
            document.attachEvent('onWeixinJSBridgeReady', wxCloseView);
        }
    } else {
        wxCloseView();
    }
}

// CryptoJS AES 加解密
const key = CryptoJS.enc.Utf8.parse(`${dayjs().format('YYYYMMDD')}`);
export const encrypt = function (word) {
    const iv = CryptoJS.enc.Utf8.parse("NQCu0RcO");
    const pwd = CryptoJS.enc.Utf8.parse(word);
    let ciphertext = CryptoJS.AES.encrypt(pwd, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv,
    }).toString();
    return ciphertext;
}
// 解密
export const decrypt = function(word){
    const encryptedHexStr = CryptoJS.enc.Base64.parse(word)
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypted = CryptoJS.AES.decrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}