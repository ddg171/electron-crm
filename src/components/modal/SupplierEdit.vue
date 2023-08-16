<template>
  <AppModal :show-close="showClose" size="large" @click-outside="emits('click-outside')">
    <h3>顧客情報</h3>
    <el-row>
      <el-col>
        <SupplierEditForm :initial-value="props.supplier" @submit="emits('update')" />
      </el-col>
    </el-row>

  </AppModal>
</template>

<script setup lang="ts">
import {computed} from 'vue';


import AppModal from './AppModal.vue';
import SupplierEditForm from "../form/supplier/Edit.vue"
import {Supplier} from '../../../electron/model/suppliers';
const emits=defineEmits<{(e:"click-outside"):void,(e:"update"):void}>()

interface Props{
  supplier:Supplier|null
}

const showClose = computed<boolean>(()=>{
  return !!props.supplier
})

const props=withDefaults(defineProps<Props>(),{supplier:null})

</script>