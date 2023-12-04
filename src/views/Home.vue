<template>
  <div class="home">
    <div class="times"> 
      <h3>{{ msg }}</h3>
      <p>{{ formatTime(times) }}</p>
    </div>
  </div>
  <button @click="onMask">点我测试弹窗</button>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import Rule from '@/components/layer/Test.vue';
const { proxy }: any = getCurrentInstance();
const msg = ref("Hello Vue3.0");
const imgUrl = ref("");
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

const onMask = ()=>{
  proxy.vshow3({
    componenTag:Rule,
    rData:{msg:1},
    isSucDestory:true,
    onSuccess:(v)=>{
      console.log("执行success",v)
      proxy.vshow3({
        componenTag:Rule
      })
    },
    onCancel:()=>{
      console.log("执行onCancl")
    }
  })
}

const formatTime = (v: string | any): string => {
  return v ? dayjs(v).format("YYYY年MM月DD日 HH时mm分ss秒") : '--'
}

onMounted(() => {
  console.log('当前的this指向',proxy);
  getDateTimes();
})
</script>

<style lang="scss" scoped>
.times {
  background: linear-gradient(to right, #c20fc2, #e0f009);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  font-size: 10vw;
  p{
    font-size:24px;
  }
}
</style>