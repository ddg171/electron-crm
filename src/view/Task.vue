<template>
  <el-row align="middle" justify="center" class="page-view">

    <el-col :xs="12">
      <h3>未完了</h3>
      <ul>
        <li v-for="t in unFinishedTasks" :key="t._id">
          <TaskCard :task="t" :items="items" />
        </li>
      </ul>
    </el-col>
    <el-col :xs="12">
      <h3>完了</h3>
      <ul>
        <li v-for="t in finishedTasks" :key="t._id">
          <TaskCard :task="t" :items="items" />
        </li>
      </ul>
    </el-col>

  </el-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useItemsState } from '../composables/item';
import { useTasksState } from '../composables/tasks';
import TaskCard from '../components/card/Task.vue';

const {tasks,get:getTasks,reset:resetTasks} = useTasksState()

const {items,get:getItems,reset:reetItems} = useItemsState()

const init = async()=>{
  resetTasks()
  reetItems()
  await getTasks()
  await getItems()
  console.log(tasks)
}

const finishedTasks = computed(()=>{
  return tasks.value.filter(t=>t.isFinished)
})

const unFinishedTasks = computed(()=>{
  return tasks.value.filter(t=>!t.isFinished)
})

init()
</script>

<style scoped>
.time {
  color: orange;
  margin: 0;
}

#content {
  min-height: calc(25vh - 36px);
}
</style>
