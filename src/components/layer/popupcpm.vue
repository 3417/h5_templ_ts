<template>
  <div class="cpm-mask" :style="{ backgroundColor: props.maskBgColor }">
    <div class="cpm_popup cpm_popup_in" :class="{ 'cpm_popup_out': !popupShow }" v-fixed>
      <component :is="componentTag" v-bind="$attrs" :rData="props.rData" @onSuccess="onSuccess" @onCancel="onCancel" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import config from './config';
/**
 * 1.使用方法
 * vshow3(String/Object)  //预留了String类型，目前未使用
 * 传入的需要页面展示的数据放在rData对象中，hasType为不同类型弹窗标识
 * 2.接受参数
 * 接受参数：String,Object
 * Object:
 *    1.hasType:各组件标识
 *    2.maskBgColor:蒙层背景色（已默认可不传）
 *    3.rData:相关数据信息
 *    4.onSuccess:成功回调
 *    5.onSuccess:关闭回调
 *    6.isOwnDestory:阻止弹窗自动销毁(如需要自定义何时销毁弹窗请将改字段置为true) 
 * 调用事例:
 *  const instance = getCurrentInstance();
  * const {vshow3} = instance.appContext.config.globalProperties;
  * vshow3({
  *    hastype:<type>,
  *    rData:<object>,
  *    isOwnDestory:<boolean>
  *    onSuccess:<fn(参数)>,
  *    onCancel:<fn(参数)>
  * })
 * 
 * tip:
 * 1.各组件按照vue的$emit方法调用onSuccess，onCancel方法 
 * 2.可根据不用的业务需求传入自定义的参数判断执行不用的逻辑
 * */
const popupShow = ref(false);
const componentTag:any = ref("");
const destory:any = ref(null);
defineOptions({
  name: "popupCpm"
})
let props = defineProps({
  hasType: {
    type: Number,
    default: 0
  },
  maskBgColor: {
    type: String,
    default: "rgba(0,0,0,.85)"
  },
  rData: {
    type: Object,
    default: () => { }
  },
  isOwnDestory: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => { }
  },
  onSuccess: {
    type: Function,
    default: () => { }
  }
})

const vFixed = {
  mounted() {
    let scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText +=
      "position:fixed;overflow:hidden;width:100%;top:-" + scrollTop + "px;";
  },
  unmounted() {
    let body = document.body;
    body.style.position = "";
    let top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop =
      -parseInt(top);
    body.style.top = "";
    body.style.overflow = "initial";
  }
}

nextTick(() => {
  componentTag.value = {
    ...config
  }[props.hasType]

})

// 销毁该弹窗主题
const _destory = ()=>{
  popupShow.value = false;
  destory.value();

}

const onCancel = (v:any) => {
  console.log(props)
  if(props.isOwnDestory) props.onCancel(v,_destory)
  else _destory()
}
const onSuccess = (v:any) => {
  if(props.isOwnDestory) props.onSuccess(v,_destory)
  else _destory()
}

const vshow3 = (fn:any) => {
  popupShow.value = true;
  destory.value = fn;
}

defineExpose({
  onCancel,
  onSuccess,
  vshow3
})


</script>

  
<style lang="scss" scoped>
.cpm-mask {
  position: fixed;
  z-index: 99;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.cpm_popup_in {
  animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.cpm_popup_out {
  animation: fade-out 0.18s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

// 进入动画效果
@keyframes scale-in-center {
  0% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>