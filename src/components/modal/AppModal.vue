<template>
  <Overlay v-if="props.showClose" @click="emits('click-outside')">
    <el-card class="modal" :size="props.size" @click.stop="()=>{}">
      <slot />
    </el-card>
  </Overlay>
</template>

<script setup lang="ts">

import Overlay from '../Overlay.vue';

const emits=defineEmits<{(e:"click-outside"):void,(e:"create",v?:string):void}>()

interface Props{
  showClose:boolean
  size?:"normal"|"large"
}

const props=withDefaults(defineProps<Props>(),{showClose:false,size:"normal"})

</script>

<style scoped>
.modal[size="large"] {
  min-width: 756px;
}
</style>