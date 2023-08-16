<template>
  <el-form :model="form" label-width="120px" @submit.prevent="submit">
    <el-form-item label="名前">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="住所">
      <el-input v-model="form.location" />
    </el-form-item>
    <el-form-item label="郵便番号">
      <el-input v-model="form.zipCode" />
    </el-form-item>
    <el-form-item label="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="電話番号">
      <el-input v-model="form.tel" />
    </el-form-item>
    <el-form-item label="FAX">
      <el-input v-model="form.fax" />
    </el-form-item>
    <el-form-item label="担当者名">
      <el-input v-model="form.managerName" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Create</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import{reactive}from "vue"
import {Supplier} from "../../../../electron/model/suppliers"

interface Props{
  initialValue:Supplier|null
}

type SupplierFormValues= Omit<Supplier,"_id"|"createdAt"|"updatedAt">

const props = withDefaults(defineProps<Props>(),{initialValue:null})
const emits=defineEmits<{(e:"submit",v?:number):void}>()

const form =reactive<SupplierFormValues>(
  {
  name:"",
  isActive:true,
  location:"",
    zipCode:"",
  tel:"",
  fax:"",
  email:"",
  managerName:""
  }
)
const submit =async ()=>{
  const id =props.initialValue?._id
  if(!id) return
  const {name,isActive,location,zipCode,tel,fax,email,managerName  } =form
  const payload ={
    name,
    isActive,
    location,
    zipCode,
    tel,
    fax,
    email,
    managerName
  }
  const num= await window.supplierAPI.update(id,payload)
  emits("submit",num)
}

const sync =()=>{
  if(!props.initialValue) return
  form.name = props.initialValue.name
  form.isActive = props.initialValue.isActive
  form.location = props.initialValue.location
  form.zipCode = props.initialValue.zipCode
  form.tel = props.initialValue.tel
  form.fax = props.initialValue.fax
  form.email = props.initialValue.email
  form.managerName = props.initialValue.managerName
}

sync()
</script>