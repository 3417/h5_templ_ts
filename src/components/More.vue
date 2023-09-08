<template>
  <div class="more_slot">
    <slot name="default"></slot>
    <slot name="btn">
      <div class="more_btn">
        <div class="check_btn" @click="emit('onCheckFn')">
            <p class="icon"><van-icon name="arrow-down" /></p>
            <p class="text">查看更多</p>
        </div>
      </div>
    </slot>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "moreslot",
});
const emit = defineEmits(['onCheckFn']);
</script>
<style lang="scss" scoped>
.more_slot {
  width: 100%;
  background-color: #000;
  .more_btn {
    background-image: linear-gradient(180deg, transparent 0%, #fff 90%);
    text-align: center;
    padding: 30px 0;
    color: #eee;
    .text {
      margin-left: 4px;
    }
  }

  .check_btn{
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
