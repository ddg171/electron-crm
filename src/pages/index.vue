<template>
  <div>
    <ul>
      <li v-for="t in data" :key="t._id" :id="`task-${t._id}`">
        {{ t.text }}/{{formatDate(t.deadline)}}/ <button @click="del(t._id)">del</button></li>
    </ul>
  </div>
  <div>

    <form @submit.prevent="insert">
      <div>
        <label for="">やる事
          <input type="text" name="text" v-model="text" required>
        </label>
      </div>
      <div>
        <label for="">
          締切
          <input type="date" name="daedline" v-model="deadlineRaw" required>
        </label>
      </div>
      <button>insert</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref,computed,onMounted } from 'vue';
import {format,parse,isValid} from "date-fns"

const data = ref<any[]>([])
const text =ref<string>("")
const deadlineRaw = ref<string>(format(new Date(),"yyyy-MM-dd"))
const deadline= computed<Date|null>(()=>{
  const d =parse(deadlineRaw.value,"yyyy-MM-dd",new Date())
  return isValid(d)?d:null
})
const formatDate=(d:Date|null):string=>{
  console.log(d)
  if(!d) return "none"
  return format(d,"yyyy-MM-dd")
}
const init = async ()=>{
  data.value=[]
  text.value=""
  const result= await window.myAPI.find()
  console.log(result)
  data.value= result
}

onMounted(async ()=>{
  await init()
})

const  insert = async ()=>{
  if(!deadline.value) return
  const payload= {text:text.value,isFinished:false,deadline:deadline.value}
  console.log(payload)
  await window.myAPI.insert(payload)
  await init()
}

const del = async (id:string)=>{
  await window.myAPI.delete(id)
  await init()
}
</script>