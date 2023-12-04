declare interface vshow3<T=any>{
    componenTag:any|undefined;
    maskBgColor?:string;
    rData?:{[key:string]:T} | any;
    isSucDestory?:boolean;
    isCanDestory?:boolean;
    onSuccess?:Function,
    onCancel?:Function
}