<template>
  <el-form>
    <el-form-item label="名前">
      <el-input v-model="form.name" required />
    </el-form-item>
    <el-form-item label="分類">
      <el-input v-model="form.category" />
    </el-form-item>
    <el-form-item label="説明">
      <el-input v-model="form.description" />
    </el-form-item>

    <el-form-item label="消耗品">
      <el-switch v-model="form.isConsumable" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import{reactive}from "vue"
import {Item} from "../../../../electron/model/items"

interface Props{
  userId?:string
}

const props = defineProps<Props>()

type NewItemFormValues= Omit<Item,"_id"|"createdAt"|"updatedAt"|"userId">
const emits=defineEmits<{(e:"submit",id?:string):void}>()
const form =reactive<NewItemFormValues>(
  {
  name:"",
  category:"",
  description:"",
  isConsumable:false
  }
)

const submit =async ()=>{
  if(!props.userId) return
  const {name,category,description,isConsumable} =form

  const payload ={
    name,
    category,
    userId:props.userId,
    description,
    isConsumable

  }
  const r= await window.itemAPI.insert(payload)
  const id =r._id
  console.log("submit:item")
  emits("submit",id)
}

</script>