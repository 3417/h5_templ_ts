<template>
  <h2>Vue3+Vite+Vant4+Typescript</h2>
  <van-button type="primary" @click="handleOnClick">主要按钮</van-button>
</template>

<script lang="ts" setup>
import { showLoadingToast } from 'vant';
const $http: any = inject("$http");
const $popup: any = inject("$popup");
const { proxy }: any = getCurrentInstance();
defineOptions({
  name: "home"
})
const onPopup = () => {
  $popup().then().catch();
}

const handleOnClick = () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  })
}

onMounted(() => {
  console.log('当前的this指向', proxy);
})
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
</style>
