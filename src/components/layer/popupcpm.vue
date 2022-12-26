<template>
  <div class="cpm-mask" :style="{ backgroundColor: maskBgColor }">
    <div class="cpm_popup cpm_popup_in" :class="{ 'cpm_popup_out': !popupShow }" v-fixed>
      <component :is="componentTag" v-bind="$attrs" :rData="rData" @onSuccess="onTSuccess" @onCancel="onTCancel" />
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * 1.使用方法
 * vspop(String/Object)  //预留了String类型，目前未使用
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
  * const {vspop} = instance.appContext.config.globalProperties;
  * vspop({
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
import config from './config';
const popupShow = ref(false);
const componentTag:any = ref("");
const destory:any = ref(null);
defineOptions({
  name: "popupCpm"
})
interface Props {
  hasType?:number|string,
  maskBgColor?:string,
  rData?:object|any,
  isOwnDestory?:boolean,
  onCancel?:Function,
  onSuccess?:Function,
}
let props = withDefaults(defineProps<Props>(),{
  hasType: 0,
  maskBgColor:"rgba(0,0,0,.85)",
  rData: {},
  isOwnDestory: false,
  onCancel: ()=>{},
  onSuccess: ()=>{}
})

const {
  hasType,
  maskBgColor,
  rData,
  isOwnDestory,
  onCancel,
  onSuccess
} = props;

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
  }[hasType]

})

// 销毁该弹窗主题
const _destory = ()=>{
  popupShow.value = false;
  destory.value();

}

const onTCancel = (v:any) => {
  if(isOwnDestory) onCancel(v,_destory)
  else _destory()
}
const onTSuccess = (v:any) => {
  if(isOwnDestory) onSuccess(v,_destory)
  else _destory()
}

const vspop = (fn:any) => {
  popupShow.value = true;
  destory.value = fn;
}

defineExpose({
  onCancel,
  onSuccess,
  vspop
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

// 退出动画效果
@keyframes fade-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>