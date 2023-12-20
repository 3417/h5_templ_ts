<template>
    <div class="test">
        {{ props.rData?.msg }}
        <button @click="emit('onSuccess','success')">Success</button>
    </div>
    <div class="close" @click="emit('onCancel','fail')">X</div>
</template>
<script setup lang="ts">
const emit = defineEmits(["onCancel","onSuccess"]);
const props = defineProps(['rData'])
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
    font-size: 22px;
    cursor: pointer;
    text-align: center;
    border: 2px solid #fff;
    border-radius: 50%;
}
</style>