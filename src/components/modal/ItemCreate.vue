<template>
  <AppModal :show-close="props.showClose" size="large" @click-outside="emits('click-outside')">
    <el-row>
      <el-col>
        <ItemCreateForm :userId="props.userId" @submit="emitCreate" />
      </el-col>
    </el-row>
  </AppModal>
</template>


<script setup lang="ts">

import AppModal from './AppModal.vue';
import ItemCreateForm from "../form/item/Create.vue"

const emits=defineEmits<{(e:"click-outside"):void,(e:"create",v?:string):void}>()

const emitCreate =(id:string|undefined)=>{
  emits("create",id)
}

interface Props{
  showClose:boolean
  userId:string
}

const props=withDefaults(defineProps<Props>(),{showClose:false,userId:""})

</script>