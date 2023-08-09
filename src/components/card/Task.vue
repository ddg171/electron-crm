<template>
  <el-card>
    <template #header>
      <el-row>
        <el-col span="6">
          <h3>{{ props.task.name }}/{{ props.task.isFinished?"済":"未" }}</h3>
        </el-col>
      </el-row>
    </template>
    <el-row>
      <el-col :span="6">
        完了予定日:{{format(props.task.estinatedDeliveryDate,"yyyy/MM/dd")}}
      </el-col>

    </el-row>
    <el-row gutter="16">
      <el-col :span="4">
        <el-button @click="finish" size="large">全て完了にする</el-button>
      </el-col>
      <el-col span="6">
        <el-button v-for="i in itemList" :key="i" @click="finishItemTask(props.task._id,i,!props.task.itemTasks[i])"
          size="large">{{
          itemsObj[i] }}/{{ !!props.task.itemTasks[i]?"済":"未" }}</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {Task} from "../../../electron/model/tasks";
import {Item} from "../../../electron/model/items";
import {format} from "date-fns";

const itemList = computed<string[]>(() => {
  return Object.keys(props.task.itemTasks);
});

interface Props{
  task:Task
  items:Item[]
}

const itemsObj =computed<{[T:string]:string}>(()=>{
  const obj ={} as {[T:string]:string}
  props.items.forEach((i:Item)=>{
    obj[i._id]=i.name
  })
  return obj
})
const props = defineProps<Props>()
interface Emits {
  (e: "update"): void
  (e:"finish"):void
  (e:"undo"):void
}
const emits = defineEmits<Emits>()

const finishItemTask =async (taskId:string,itemId:string,isFinished:boolean)=>{
  await window.taskAPI.itemTask(taskId,itemId,isFinished)
  emits("update")
}

const finish =async ()=>{
  await window.taskAPI.finish(props.task._id)
  emits("update")
}
</script>