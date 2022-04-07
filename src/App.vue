<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// console.log('获取不同状态的加载==>',import.meta.env)
import { computed, ref } from 'vue';
import {useStore} from '@/store';
const store = useStore();
const show = computed(()=>store.isLoading); 

// setTimeout(() => {
//     store.SET_LOADING(true)
// }, 1000);
</script>

<template>
  <router-view />
  <!-- 页面加载蒙层 -->
  <van-popup class="mask" v-model:show="show" :overlay-style="{background:'rgba(0,0,0,.5)'}" :close-on-click-overlay="false">
    <van-loading type="spinner" color="#1989fa"/>
  </van-popup>
</template>

<style lang="scss">
#app {
  font-family: "微软雅黑", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.mask{
  overflow: hidden !important;
}
</style>
