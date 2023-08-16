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

type NewSupplierFormValues= Omit<Supplier,"_id"|"createdAt"|"updatedAt">

const emits=defineEmits<{(e:"submit",id?:string):void}>()

const form =reactive<NewSupplierFormValues>(
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
  const r= await window.supplierAPI.insert(payload)
  const id =r._id


  emits("submit",id)
}

</script>