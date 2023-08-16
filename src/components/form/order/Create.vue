<template>
  <el-form label-width="240px">
    <el-form-item label="顧客">
      <el-select v-model="form.userId" placeholder="お客様を選択">
        <el-option label="選択" value="" />
        <el-option v-for="u in userIdList" :key="u.id" :label="u.name" :value="u.id" />
      </el-select>
      <el-button @click="$emit('click-add-customer')" size="large">顧客追加</el-button>
    </el-form-item>
    <el-form-item label="納品予定日">
      <el-row>
        <el-col class="date-picker-col">
          <el-date-picker v-model="form.estinatedDeliveryDate" />
        </el-col>
        <el-col class="date-picker-col">
          <el-button @click="sub(14)">-2週間</el-button>
          <el-button @click="add(14)">+2週間</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-show="!props.submitButtonShown">
      <el-button type="primary" @click="submit" size="large">注文作成</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import{reactive,computed,watch, onMounted}from "vue"
import {Order} from "../../../../electron/model/orders"

import {User} from "../../../../electron/model/users";
import { addDays,subDays} from "date-fns"

type NewItemFormValues= Omit<Order,"_id"|"createdAt"|"updatedAt"|"status"|"items"|"taskTotalCount"|"finishedTaskCount">
interface Emits {
  (e:"submit",id:string):void
  (e:"user-select",id:string):void
  (e:"click-add-customer"):void
}
const emits=defineEmits<Emits>()
const form =reactive<NewItemFormValues>(
  {
    memo:"",
    estinatedDeliveryDate:new Date(),
    userId:""
  }
)

const add =(d:number)=>{
  form.estinatedDeliveryDate = addDays(form.estinatedDeliveryDate,d)
}

const sub =(d:number)=>{
  form.estinatedDeliveryDate = subDays(form.estinatedDeliveryDate,d)
}

interface Props{
  users:User[]
  userId:string|null
  submitButtonShown:boolean
}

const props =withDefaults(defineProps<Props>(),{users:()=>[],userId:null,submitButtonShown:false})
const userId = computed(()=>form.userId)
watch(userId,(val:string)=>{
  emits("user-select",val)
})

const userIdList =computed<{id:string,name:string}[]>(()=>{
  return props.users.map((u)=>{
    return{id:u._id,name:u.name}
  })
})

const submit =async ()=>{
  const {memo,estinatedDeliveryDate,userId} =form
  if(!userId) return

  const payload ={
    memo,
    items:[],
    estinatedDeliveryDate,
    userId,
    taskTotalCount:0,
    finishedTaskCount:0
  }
  const r= await window.orderAPI.insert(payload)
  const id =r._id

  emits("submit",id)
}

onMounted(()=>{
  if(!props.userId) return
  form.userId = props.userId
})

defineExpose({
  submit
})

</script>

<style scoped>
.date-picker-col {
  text-align: left;
}
</style>