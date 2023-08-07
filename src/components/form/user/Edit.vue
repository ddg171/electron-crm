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
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import{reactive}from "vue"
import {User} from "../../../../electron/model/users"

interface Props{
  initialValue:User|null
}

type UserFormValues= Omit<User,"_id"|"createdAt"|"updatedAt">

const props = withDefaults(defineProps<Props>(),{initialValue:null})
const emits=defineEmits<{(e:"submit"):void}>()

const form =reactive<UserFormValues>(
  {
  name:"",
  hurigana:"",
  sex:"other",
  birthDay:new Date()
  }
)

const sync =()=>{
  if(!props.initialValue) return
  form.name = props.initialValue.name
  form.hurigana=props.initialValue.hurigana
  form.sex = props.initialValue.sex
  form.birthDay=props.initialValue.birthDay
}

const submit =async ()=>{
  const id= props.initialValue?._id
  if(!id) return
  const {name,hurigana,sex,birthDay} =form
  const payload ={
    name,
    hurigana,
    sex,
    birthDay,
  }
  const r= await window.userAPI.update(id,payload)
  console.log(r)


  emits("submit")
}

sync()
</script>