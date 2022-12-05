import { createVNode, render, defineComponent } from 'vue';
import popupCpm from './popupcpm.vue';
let container = document.body;
const componentConstructor = defineComponent(popupCpm);
const destory = () => {
    setTimeout(() => {
        render(null, container);
    }, 180);
}
const vshow3 = (ops:any) => {
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
    return $instance.vshow3(destory);
}

export default (app:any) => {
    app.config.globalProperties.vshow3 = vshow3;
};
