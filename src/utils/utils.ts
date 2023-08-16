
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