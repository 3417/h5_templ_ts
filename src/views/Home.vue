<template>
  <div class="home">
    <div class="times"> 
      <h3>{{ msg }}</h3>
      <p>{{ formatTime(times) }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
const { proxy }: any = getCurrentInstance();
const msg = ref("Hello Vue3.0");
const times:any = ref("");
const getDateTimes = () => {
  times.value = new Date();
  setTimeout(() => {
    getDateTimes();
  }, 1000);
}
defineOptions({
  name: "home"
})

const formatTime = (v: string | any): string => {
  return v ? dayjs(v).format("YYYY年MM月DD日 HH时mm分ss秒") : '--'
}

onMounted(() => {
  console.log('当前的this指向', proxy);
  getDateTimes();
  proxy.vshow3()
})
</script>

<style lang="scss" scoped>
.times {
  background: linear-gradient(to right, #c20fc2, #e0f009);
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  font-size: 10vw;
  p{
    font-size:6vw;
  }
}
</style>
