<template>
  <AppModal :show-close="props.showClose" size="large" @click-outside="emits('click-outside')">
    <el-row>
      <el-col>
        <TaskCreateForm :userId="props.userId" :orderId="props.orderId"
          :estinatedDeliveryDate="props.estinatedDeliveryDate" :suppliers="props.suppliers" :items="props.items"
          @submit="emitCreate" />
      </el-col>
    </el-row>
  </AppModal>
</template>


<script setup lang="ts">

import AppModal from './AppModal.vue';
import TaskCreateForm from "../form/task/Create.vue"
import {Item} from '../../../electron/model/items';
import {Supplier} from '../../../electron/model/suppliers';

const emits=defineEmits<{(e:"click-outside"):void,(e:"create",v?:string):void}>()

const emitCreate =(id:string|undefined)=>{
  emits("create",id)
}



interface Props{
  showClose:boolean
  userId:string|null
  orderId:string|null
  items:Item[]
  estinatedDeliveryDate:Date|null
  suppliers:Supplier[]
}
const props=withDefaults(defineProps<Props>(),{showClose:false,userId:"",estinatedDeliveryDate:null,suppliers:()=>[],items:()=>[]})

</script>