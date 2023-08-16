<template>
  <AppModal :show-close="props.showClose" size="large" @click-outside="emits('click-outside')">
    <el-row>
      <el-col>
        <SupplierCreateForm @submit="emitCreate" />
      </el-col>
    </el-row>
  </AppModal>
</template>


<script setup lang="ts">

import AppModal from './AppModal.vue';
import SupplierCreateForm from "../form/supplier/Create.vue"

const emits=defineEmits<{(e:"click-outside"):void,(e:"create",v?:string):void}>()

const emitCreate =(id:string|undefined)=>{
  emits("create",id)
}

interface Props{
  showClose:boolean
}

const props=withDefaults(defineProps<Props>(),{showClose:false})

</script>