import { createVNode, render} from 'vue';
import popupCpm from './popupcpm.vue';
let container = document.body;
const componentConstructor = popupCpm;
interface vshowProps {
    hasType?:number|string,
    maskBgColor?:string,
    rData?:object|any,
    isOwnDestory?:boolean,
    onCancel?:Function,
    onSuccess?:Function,
}
const destory = () => {
    setTimeout(() => {
        render(null, container);
    }, 180);
}
const vspop = (ops:vshowProps) => {
    // 获取传入的值
    if (container.querySelector('.cpm-mask')) {
        return;
    }
    let iProps:any = {}, cps = componentConstructor.props;
    if (ops) {
        Object.keys(ops).forEach(item => iProps[item] = cps[item] && cps[item].default); //获取组件的props的值
    } else {
        Object.keys(cps).forEach(item => iProps[item] = cps[item] && cps[item].default);
    }
    if (typeof ops === 'string') {
        console.log("执行传入字符串的逻辑操作")
    } else if (typeof ops === 'object') {
        Object.assign(iProps, ops);
    }
    const vm:any = createVNode(popupCpm, iProps);
    render(vm, container);
    const $instance = vm.component.exposed;
    return $instance.vspop(destory);
}

export default (app:any) => {
    app.config.globalProperties.vspop = vspop;
};
