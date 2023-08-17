<template>
  <el-row align="middle" justify="center" class="page-view">

    <el-col :xs="12">
      <el-card>
        <template #header>
          <el-row>
            <h2>絞り込み</h2>
          </el-row>
        </template>
        <el-row :gutter="4">
          <el-col :span="10">
            <el-switch v-model="isOutSource" class="mb-2" active-text="外注のみ" inactive-text="全て" />
          </el-col>
          <el-col :span="10">
            <el-form-item label="取引先">
              <el-select v-model="supplierId">
                <el-option label="選択" value="" />
                <el-option v-for="s in suppliers" :key="s._id" :label="s.name" :value="s._id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="顧客">
              <el-select v-model="userId">
                <el-option label="選択" value="" />
                <el-option v-for="u in users" :key="u._id" :label="u.name" :value="u._id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>未完了の工程</h2>
          </el-row>
        </template>
        <el-row :gutter="6">
          <el-col class="task-list" v-for="t in unFinishedTasks" :key="t._id">
            <TaskCard :suppliers="suppliers" :task="t" :items="items" />
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>完了した工程</h2>
          </el-row>
        </template>
        <el-row :gutter="6">
          <el-col class="task-list" v-for="t in finishedTasks" :key="t._id" @update="init">
            <TaskCard :suppliers="suppliers" :task="t" :items="items" @update="init" />
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useItemsState } from '../composables/item';
import { useTasksState } from '../composables/tasks';
import TaskCard from '../components/card/Task.vue';
import { useUsersState } from '../composables/user';
import { useSuppliersState } from '../composables/suppliers';
import { useRoute } from 'vue-router';

const { tasks, get: getTasks, reset: resetTasks } = useTasksState()
const { users, get: getUsers, reset: resetUsers } = useUsersState()
const { items, get: getItems, reset: reetItems } = useItemsState()
const { suppliers, get: getSuppliers, reset: resetSuppliers } = useSuppliersState()

const isOutSource = ref<boolean>(false)
const userId = ref<string>("")
const supplierId = ref<string>("")
const init = async () => {
  resetTasks()
  reetItems()
  resetUsers()
  resetSuppliers()
  await getTasks({}, { estinatedDeliveryDate: 1 })
  await getItems()
  await getUsers()
  await getSuppliers()
}

const filtered = computed(() => {
  let filteredTasks = tasks.value
  if (isOutSource.value) {
    filteredTasks = filteredTasks.filter(t => t.isOutSource)
  }
  if (userId.value) {
    filteredTasks = filteredTasks.filter(t => t.userId === userId.value)
  }
  if (supplierId.value) {
    filteredTasks = filteredTasks.filter(t => t.supplierId === supplierId.value)
  }
  return filteredTasks
})

const finishedTasks = computed(() => {
  return filtered.value.filter(t => t.isFinished)
})

const unFinishedTasks = computed(() => {
  return filtered.value.filter(t => !t.isFinished)
})

init()

onMounted(() => {
  const route = useRoute()
  const s = route.query.supplierId
  const u = route.query.userId
  if (s) {
    supplierId.value = s as string
  }
  if (u) {
    userId.value = u as string
  }
})
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
../composables/item