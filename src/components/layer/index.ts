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
    let obj = {}
    Object.keys(componentConstructor.props).forEach(v=>{
        obj[v] = componentConstructor.props[v].default
    })
    Object.assign(obj,opts);
    const vm:any = createVNode(popupCpm, obj);
    $ele = render(vm, container);
    $ele = vm.component.exposed;
    $eles.push($ele);
}
const vshow3 = (opts:vshowProps) => {
    // 获取传入的值
    // if (container.querySelector('.cpm-mask')) {
    //     return;
    // }
    // let iProps:any = {}, cps = componentConstructor.props;
    // if (ops) {
    //     Object.keys(ops).forEach(item => iProps[item] = cps[item] && cps[item].default); //获取组件的props的值
    // } else {
    //     Object.keys(cps).forEach(item => iProps[item] = cps[item] && cps[item].default);
    // }
    // if (typeof ops === 'string') {
    //     console.log("执行传入字符串的逻辑操作")
    // } else if (typeof ops === 'object') {
    //     Object.assign(iProps, ops);
    // }
    // const vm:any = createVNode(popupCpm, iProps);
    // render(vm, container);
    // const $instance = vm.component.exposed;
    // return $instance.vshow3(destory);
    switch(typeof opts){
        case 'string':
            console.log('Oops... isString');
            break;
        case 'object':
            Mask(opts);
            break;    
    }
    return $ele.vshow3().then(_res=>{
        console.log("suceess-emit传递的参数=>",_res);
        if(opts?.isOwnDestory){
            opts['onSuccess'](_res,destory);
            return;
        }
        destory();
    }).catch(_err=>{
        console.log("fail-emit传递的参数=>",_err);    
        destory();
    })
}

export default (app:any) => {
    app.config.globalProperties.vshow3 = vshow3;
};
