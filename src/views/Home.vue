<template>
  <h2>Vue3.0</h2>
  <button @click="onPopup">123</button>
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
</style>
