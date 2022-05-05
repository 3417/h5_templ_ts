import {
    createVNode,
    render
} from 'vue'
import pComponent from './index.vue';
let container = document.body;
const $_popup = (ops:any) => {
    let def:any = {},
        cps = pComponent.props;
    Object.keys(cps).forEach(item => def[item] = cps[item].default); //获取组件的props的值
    return new Promise((resolve, reject) => {
        const handleConfirm = () => {
            render(null, container)
            resolve(ops)
        }
        const handleCancel = () => {
            render(null, container);
            reject()
        }

        if (container.querySelector('.iv_confirm')) {
            return;
        }
        let ivProps = Object.assign({}, def, {...ops,handleConfirm,handleCancel})
        const vm = createVNode(pComponent, ivProps);
        render(vm, container);
    })
}


export default $_popup;