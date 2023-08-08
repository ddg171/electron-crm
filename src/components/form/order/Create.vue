<template>
  <el-form>
    <el-form-item label="顧客">
      <el-select v-model="form.userId" placeholder="お客様を選択">
        <el-option label="選択" value="" />
        <el-option v-for="u in userIdList" :key="u.id" :label="u.name" :value="u.id" />
      </el-select>
      <el-button @click="$emit('click-add-customer')">顧客追加</el-button>
    </el-form-item>
    <el-form-item label="摘要欄">
      <el-input v-model="form.memo" type="textarea" />
    </el-form-item>
    <el-form-item label="納品予定日">
      <el-date-picker v-model="form.estinatedDeliveryDate" />
    </el-form-item>
    <el-form-item v-show="!props.submitButtonShown">
      <el-button type="primary" @click="submit">Create</el-button>
    </el-form-item>
    <p>
      預かり品数: {{ items.length }}個</p>
  </el-form>
</template>

<script setup lang="ts">
import{reactive,computed,watch}from "vue"
import {Order} from "../../../../electron/model/orders"
import {Item} from "../../../../electron/model/items";
import {User} from "../../../../electron/model/users";


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

interface Props{
  users:User[]
  items:Item[]
  submitButtonShown:boolean
}

const props =withDefaults(defineProps<Props>(),{users:()=>[],items:()=>[],submitButtonShown:false})
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
  // 謎
  const items = props.items.map((i:Item)=>i._id)
  console.log(items)
  if(!userId) return
  if(props.items.length<=0) return

  const payload ={
    memo,
    items,
    estinatedDeliveryDate,
    userId,
    taskTotalCount:0,
    finishedTaskCount:0
  }
  const r= await window.orderAPI.insert(payload)
  const id =r._id
  console.log("submit:order",id)

  emits("submit",id)
}


defineExpose({
  submit
})

</script>