<template>
  <div class="cpm-mask" :style="{ backgroundColor: maskBgColor }">
    <div class="cpm_popup cpm_popup_in" :class="{ 'cpm_popup_out': !popupShow }" v-fixed>
      <component :is="componenTag" v-bind="$attrs" :rData="rData" @onSuccess="onSuccess" @onCancel="onCancel" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const popupShow = ref(false);
const promise:any = ref({});
const callback = reactive({
  resolve:(v:any)=>{},
  reject:(v:any)=>{}
})
defineOptions({
  name: "popupCpm"
})

interface Props {
  componenTag?:any,
  maskBgColor?:string,
  rData?:any,
  isSucDestory?:boolean,
  isCanDestory?:boolean,
  onCancel?:Function,
  onSuccess?:Function,
}
withDefaults(defineProps<Props>(),{
  componenTag:{},
  maskBgColor:"rgba(0,0,0,.85)",
  rData:{},
  isSucDestory:false,
  isCanDestory:false,
  onCancel: ()=>{},
  onSuccess: ()=>{}
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
const onCancel=(v:any)=>{
  callback.reject(v);
}
const onSuccess=(v:any)=>{
  callback.resolve(v);
}
const vshow3 = () => {
  popupShow.value = true;
  promise.value = new Promise((resolve:any,reject:any)=>{
    callback.resolve = resolve;
    callback.reject = reject;
  })
  return promise.value;
}

defineExpose({
  vshow3,
  onSuccess,
  onCancel,
  popupShow
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