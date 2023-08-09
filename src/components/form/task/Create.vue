<template>
  <el-form label-width="240px">
    <el-form-item label="タスク名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="外注">
      <el-switch v-model="form.isOutSource" />
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
    <el-form-item :label="`対象`">
      <el-checkbox-group v-model="itemTaskList">
        <el-tooltip v-for="i in props.items" :key="i._id" class="box-item" :content="`分類:${i.category}`"
          placement="top-start">
          <el-checkbox-button :label="i._id" :name="i.name">
            {{ i.name }}</el-checkbox-button>
        </el-tooltip>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="メモ">
      <el-input v-model="form.memo" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import{reactive,computed,ref}from "vue"
import {Item} from "../../../../electron/model/items";
import {Task} from "../../../../electron/model/tasks";

import { addDays,subDays} from "date-fns"

interface Props{
  userId:string|null
  orderId:string|null
  items:Item[]
}
const props =withDefaults(defineProps<Props>(),{userId:null,orderId:null,items:()=>[]})


type NewItemFormValues= Omit<Task,"_id"|"createdAt"|"updatedAt"|"isFinished"|"userId"|"orderId"|"itemTasks">
interface Emits {
  (e:"submit",id:string):void
  (e:"click-add-supplier"):void
}
const emits=defineEmits<Emits>()

const form =reactive<NewItemFormValues>(
  {
    name:"",
    memo:"",
    isOutSource:false,
    suppierId:null,
    estinatedDeliveryDate:new Date(),
  }
)

const reset=()=>{
  form.name=""
  form.memo=""
  form.isOutSource=false
  form.suppierId=null
  form.estinatedDeliveryDate=new Date()
  itemTaskList.value=[]
}

const itemTaskList =ref<string[]>([])
const itemTasks = computed<{[T:string]:boolean}>(()=>{
  const r:{[T:string]:boolean}={}
  itemTaskList.value.forEach(i=>r[i]=false)
  return r
})

const add =(d:number)=>{
  form.estinatedDeliveryDate = addDays(form.estinatedDeliveryDate,d)
}
const sub =(d:number)=>{
  form.estinatedDeliveryDate = subDays(form.estinatedDeliveryDate,d)
}


const submit =async ()=>{
  const {name,memo,estinatedDeliveryDate,isOutSource,suppierId} =form
  if(!props.orderId||!props.userId) return
  const payload ={
    name,
    memo,
    estinatedDeliveryDate,
    isOutSource,
    isFinished:false,
    suppierId,
    userId:props.userId,
    orderId:props.orderId,
    itemTasks:itemTasks.value
  }
  const r= await window.taskAPI.insert(payload)
  const id =r._id
  console.log("submit:order",id)

  emits("submit",id)
  reset()
}

defineExpose({
  submit
})

</script>

<style scoped>
.date-picker-col {
  text-align: left;
}
</style>