<template>
  <div class="mv_popup">
      <div class="content">
        我是内容
      </div>
      <div class="mv_group">
        <div class="mv_ok" @click="handleConfirm">确定</div>
        <div class="mv_cancel" @click="handleCancel">取消</div>
      </div>
  </div>
</template>

<script lang="ts">
export default {
    name:"mv_popup"
}
</script>


<script lang="ts" setup>
defineProps({
  isShow:{
    type:Boolean,
    default:false
  },
  handleConfirm:{
    type:Function,
    default:()=>{}
  },
  handleCancel:{
    type:Function,
    default:()=>{}
  }
})


</script>

<style lang="scss" scoped>
.mv_popup{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  background-color: rgba(0,0,0,.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color:#fff;
  .content{
    height: 18rem;
  }
  .mv_group{
    display: flex;
    align-items: center;
    .mv_ok{
      margin-right: 2rem;
    }
  }
}
</style>