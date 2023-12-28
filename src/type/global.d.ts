declare interface tshow3<T=any>{
    componenTag:any|undefined;
    maskBgColor?:string;
    rData?:{[key:string]:T} | any;
    isSucDestory?:boolean;
    isCanDestory?:boolean;
    onSuccess?:Function,
    onCancel?:Function
}


declare module 'vue' {
  interface ComponentCustomProperties {
        vshow3:tshow3
  }
}
export {}