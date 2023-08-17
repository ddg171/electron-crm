<template>
  <el-card>
    <template #header>
      <el-row justify="space-between">
        <el-col :span="12">
          <h3 class="header-heading" @click="isFolded = !isFolded">
            {{ props.task.name }}/完了予定日:{{ format(props.task.estinatedDeliveryDate, "yyyy/MM/dd") }}
          </h3>
        </el-col>
        <el-col :span="4">
          <el-button @click="toggleTask" :type="props.task.isFinished ? 'success' : 'danger'">{{ !props.task.isFinished ?
            "完了にする" : "元に戻す" }}</el-button>
        </el-col>
      </el-row>
    </template>
    <div v-show="!isFolded">
      <el-row>
        <el-form label-width="120px" class="task-form" @submit.prevent="() => { }">
          <el-row>
            <el-col :span="12">
              <el-form-item label="工程名">
                <el-input v-model="taskValue.name">
                </el-input>
              </el-form-item>
              <el-form-item label="完了予定日">
                <el-date-picker v-model="taskValue.estinatedDeliveryDate">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="外注">
                <el-switch v-model="taskValue.isOutSource">
                </el-switch>
              </el-form-item>
              <el-form-item label="外注先">
                <el-select v-model="taskValue.supplierId">
                  <el-option label="選択" value=""></el-option>
                  <el-option v-for="supplier in props.suppliers" :key="supplier._id" :label="supplier.name"
                    :value="supplier._id">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="12">
              <el-form-item :label="`関わる品物`">
                <el-checkbox-group v-model="taskValue.items">
                  <el-tooltip v-for="i in shownItems" :key="i._id" class="box-item" :content="`分類:${i.category}`"
                    placement="top-start">
                    <el-checkbox-button :label="i._id" :name="i.name">
                      {{ i.name }}</el-checkbox-button>
                  </el-tooltip>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item :label="`消費する品物`" v-if="taskValue.items.length > 0">
                <el-checkbox-group v-model="taskValue.consumedItems">
                  <el-tooltip v-for="i in selectedItems" :key="i._id" class="box-item" :content="`分類:${i.category}`"
                    placement="top-start">
                    <el-checkbox-button :label="i._id" :name="i.name" :disabled="taskValue.producedItems.includes(i._id)">
                      {{ i.name }}</el-checkbox-button>
                  </el-tooltip>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item :label="`取寄する品物`" v-if="taskValue.items.length > 0">
                <el-checkbox-group v-model="taskValue.producedItems">
                  <el-tooltip v-for="i in selectedItems" :key="i._id" class="box-item" :content="`分類:${i.category}`"
                    placement="top-start">
                    <el-checkbox-button :label="i._id" :name="i.name" :disabled="taskValue.consumedItems.includes(i._id)">
                      {{ i.name }}</el-checkbox-button>
                  </el-tooltip>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="メモ">
                <el-input type="text" v-model="taskValue.memo" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row :gutter="16" justify="space-around">
        <el-col :span="6">
          <el-button type="primary" @click="submit" size="large">更新</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" size="small" @click="deleteTask(props.task._id)">削除する</el-button>
        </el-col>
      </el-row>
    </div>
    <el-divider v-show="!isFolded" />
    <el-row>
      <el-button @click="$router.push(`/user/${props.task.userId}`)">顧客ID:{{ props.task.userId }}</el-button>
      <el-button @click="$router.push(`/order/${props.task.orderId}`)">注文ID:{{ props.task.orderId }}</el-button>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>

import { Task } from "../../../electron/model/tasks";
import { Item } from "../../../electron/model/items";
import { Supplier } from "../../../electron/model/suppliers";
import { computed, reactive, ref } from "vue";
import { format } from "date-fns";

const selectedItems = computed(() => props.items.filter(i => taskValue.items.includes(i._id)))

interface Props {
  task: Task
  items: Item[]
  suppliers: Supplier[]
}
type TaskValue = Omit<Task, "updatedAt" | "createdAt">
const isFolded = ref<boolean>(true)

const taskValue = reactive<TaskValue>(
  {
    _id: "",
    name: "",
    isFinished: false,
    isOutSource: false,
    supplierId: "",
    items: [],
    consumedItems: [],
    producedItems: [],
    estinatedDeliveryDate: new Date(),
    memo: "",
    orderId: "",
    userId: ""
  }
)

const shownItems = computed<Item[]>(() => {
  return props.items.filter(i => taskValue.items.includes(i._id))
})

const submit = async () => {
  const id = props.task._id
  const payload = {
    name: taskValue.name,
    isFinished: taskValue.isFinished,
    isOutSource: taskValue.isOutSource,
    supplierId: taskValue.supplierId,
    items: JSON.parse(JSON.stringify(taskValue.items)),
    consumedItems: JSON.parse(JSON.stringify(taskValue.consumedItems)),
    producedItems: JSON.parse(JSON.stringify(taskValue.producedItems)),
    estinatedDeliveryDate: taskValue.estinatedDeliveryDate,
    memo: taskValue.memo,
    orderId: taskValue.orderId,
    userId: taskValue.userId
  }
  await window.taskAPI.update(id, payload)
  sync()
  emits("update")
}

const sync = () => {
  taskValue._id = props.task._id
  taskValue.name = props.task.name
  taskValue.isFinished = props.task.isFinished
  taskValue.isOutSource = props.task.isOutSource
  taskValue.supplierId = props.task.supplierId
  taskValue.items = props.task.items
  taskValue.consumedItems = props.task.consumedItems
  taskValue.producedItems = props.task.producedItems
  taskValue.estinatedDeliveryDate = props.task.estinatedDeliveryDate
  taskValue.memo = props.task.memo
  taskValue.orderId = props.task.orderId
  taskValue.userId = props.task.userId
  taskValue.memo = props.task.memo
}

const props = withDefaults(defineProps<Props>(), { suppliers: () => [], })
interface Emits {
  (e: "update"): void
  (e: "finish"): void
  (e: "undo"): void
}
const emits = defineEmits<Emits>()

const deleteTask = async (id: string) => {
  await window.taskAPI.delete(id)
  emits("update")
}

const toggleTask = async () => {
  const id = props.task._id
  const isFinished = props.task.isFinished
  if (isFinished) {
    await window.taskAPI.undo(id)
  } else {
    await window.taskAPI.finish(id)
  }
  emits("update")
}
sync()
</script>

<style >
.task-form {
  width: 100%;
}

.header-heading {
  width: 100%;
  text-align: left;
  font-size: 1.25rem;
  font-weight: 700;
}
</style>