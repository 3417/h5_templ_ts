<template>
  <h2>Vue3.0+Vite+Vant3</h2>
</template>

<script lang="ts" setup>
import { inject } from "vue";
const $http: any = inject("$http");
const $popup:any = inject("$popup")

const onPopup = ()=>{
  $popup().then().catch();
}
</script>

<style lang="scss" scoped>
h2{
  text-align: center;
}
</style>
