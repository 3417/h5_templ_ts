<template>
    <div class="test">{{ msg }}</div>
    <div class="close" @click="emit('onCancel')">X</div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const emit = defineEmits(["onCancel"]);
const msg = ref("Test");
</script>
<style lang="scss" scoped>
.test {
    width: 320px;
    height: 300px;
    background-color: #f0e8e8;
    margin: 0 auto;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
}

.close {
    width: 35px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    margin: 15px auto 0;
    user-select: none;
    font-size: 30px;
    cursor: pointer;
    text-align: center;
}
</style>