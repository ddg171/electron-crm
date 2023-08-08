<template>
  <el-form :model="form" label-width="120px" @submit.prevent="submit">
    <el-form-item label="名前">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="フリガナ">
      <el-input v-model="form.hurigana" />
    </el-form-item>
    <el-form-item label="性別">
      <el-select v-model="form.sex" placeholder="please select your zone">
        <el-option label="男" value="male" />
        <el-option label="女" value="female" />
        <el-option label="その他" value="other" />
      </el-select>
    </el-form-item>
    <el-form-item label="誕生日">
      <el-date-picker v-model="form.birthDay" type="date" placeholder="Pick a date" style="width: 100%" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Create</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import{reactive}from "vue"
import {User} from "../../../../electron/model/users"

type NewUserFormValues= Omit<User,"_id"|"createdAt"|"updatedAt">

const emits=defineEmits<{(e:"submit",id?:string):void}>()

const form =reactive<NewUserFormValues>(
  {
  name:"",
  hurigana:"",
  sex:"other",
  birthDay:new Date()
  }
)

const submit =async ()=>{
  const {name,hurigana,sex,birthDay} =form
  const payload ={
    name,
    hurigana,
    sex,
    birthDay,
  }
  const r= await window.userAPI.insert(payload)
  const id =r._id


  emits("submit",id)
}

</script>