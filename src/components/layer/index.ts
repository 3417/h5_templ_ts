/**
 * 1.使用方法
 * vshow3(String/Object)  //预留了String类型，目前未使用
 * 传入的需要页面展示的数据放在rData对象中，componenTag为不同类型弹窗标识
 * 2.接受参数
 * 接受参数：String,Object
 * Object:
 *    1.componenTag:组件
 *    2.maskBgColor:蒙层背景色（已默认可不传）
 *    3.rData:相关数据信息
 *    4.onSuccess:成功回调
 *    5.onSuccess:关闭回调
 *    6.isSucDestory/isCanDestory:是否需要手动销毁弹窗
 *      6.1<默认为false,如为true则onSuccess，onCancel回调函数中会回传一个callback函数，需要手动调用销毁>
 *       6.2<eg:onSuccess:(val,cb)=>{cb && cb()}>
 * 调用事例:
  * const {proxy} = getCurrentInstance();
   * proxy.vshow({
   *    componenTag:<components>,
   *    isSucDestory:false //判断确定是否要手动销毁,默认为false
   *    isCanDestory:false //判断取消是否要手动销毁,默认为false
   *    rData:<object>,
   *    onSuccess:<fn(参数)>,
   *    onCancel:<fn(参数)>
   * })
 * 
 * tip:
 * 1.各组件按照vue的$emit方法调用onSuccess，onCancel方法 
 * 2.可根据不用的业务需求传入自定义的参数判断执行不用的逻辑
 * 3.如需要要在此组件中再次调用组建需要使用setTimeout异步方法调用
 * */
import { createVNode, render} from 'vue';
import popupCpm from './popupcpm.vue';
let container = document.body;
const componentConstructor = popupCpm;
interface vshowProps {
    componenTag:number|string,
    maskBgColor?:string,
    rData?:object|any,
    isOwnDestory?:boolean,
    onCancel?:Function,
    onSuccess?:Function,
}

let $ele,$eles=[];
const destory = () => {
    $ele.popupShow.value = false;
    setTimeout(() => {
        $ele = null;
        if($eles.length > 1){
            $ele = $eles[$eles.length - 2];
            $eles = $eles.splice($eles.length-1,1);
        }
        render(null, container);
    }, 280);
}

const destoryAll = ()=>{
    $eles.forEach(v=>{
        v.popupShow = false;
        if($eles.length > 1){
            $ele = $eles[$eles.length - 2];
            $eles = $eles.splice($eles.length-1,1);
        }
    })
    $eles = [];
    $ele = null;
    render(null, container);
}

const Mask = (opts) => {
    const app:any = createVNode(popupCpm, {
        ...opts
    });
    render(app, container);
    $ele = app.component.exposed;
    $eles.push($ele);
}
const vshow3 = (opts:vshowProps) => {
    switch(typeof opts){
        case 'string':
            console.log('Oops... isString');
            break;
        case 'object':
            Mask(opts);
            break;    
    }
    return $ele.vshow3().then(_v=>{
        console.warn("onSuccess=>",_v);
        if(opts?.isSucDestory){
            opts['onSuccess'](_v,destory);
            return;
        }
        opts.onSuccess ? opts.onSuccess() : ''
        destory();
    }).catch(_r=>{
        console.warn("onCancel=>",_r); 
        if(opts?.isCanDestory){
            opts['onCancel'](_v,destory);
            return;
        }
        opts.onCancel ? opts.onCancel() : ''
        destory();
    })
}

export default (app:any) => {
    app.config.globalProperties.vspop = vspop;
};
