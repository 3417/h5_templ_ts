<template>
    <div class="signature_box" :style="{ ...customStyle, width, height }">
        <canvas ref="signatureVue" />
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import SignaturePad from 'signature_pad';
defineOptions({
    name: 'signature'
})

// 传递的值
const props = defineProps({
    width: {
        type: String,
        default:'300px'
    },
    height: {
        type: String,
        default: '150px'
    },
    options: {
        type: Object,
        default: () => { }
    },
    customStyle: {
        type: Object,
        default: () => { }
    }
})
const { width, height, customStyle } = toRefs(props);
const signatureVue = ref(null); //获取canvas元素
const signaturePad = ref(null);  //实例画布内容
const options = {
    minWidth: 5,
    maxWidth: 10,
    penColor: "rgb(66, 133, 244)",
}
// 清除画布
const clear = ()=>{}
// 保存画布，默认到处为base64格式
const saveDataUrl = ()=>{}
// 撤销操作
const onUndo = ()=>{};
// 前进操作
const onRedo = ()=>{};

// DOM 初始化
onMounted(() => {
    const canvas = signatureVue.value;
    signaturePad.value = new SignaturePad(canvas, options);
})
</script>
<style lang="scss" scoped>
.signature_box{
    width: 100%;
    height: 100%;
}

</style>