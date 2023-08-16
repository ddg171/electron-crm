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

    <el-form-item label="今手元にある品物ならここをチェック">
      <el-switch v-model="form.isExist" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" size="large">作成</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import{reactive}from "vue"
import {Item} from "../../../../electron/model/items"

interface Props{
  userId?:string
  orderId?:string
}

const props = defineProps<Props>()

type NewItemFormValues= Omit<Item,"_id"|"createdAt"|"updatedAt"|"userId"|"firstOrderId">
const emits=defineEmits<{(e:"submit",id?:string):void}>()
const form =reactive<NewItemFormValues>(
  {
  name:"",
  category:"",
  description:"",
  isExist:true
  }
)

const submit =async ()=>{
  if(!props.userId) return
  if(!props.orderId) return
  const {name,category,description,isExist} =form
  const payload ={
    name,
    category,
    userId:props.userId,
    description,
    isExist,
    firstOrderId:props.orderId

  }
  const r= await window.itemAPI.insert(payload)
  const id =r._id
  emits("submit",id)
}

</script>