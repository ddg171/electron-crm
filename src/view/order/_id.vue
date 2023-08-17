<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <el-card>
        <template #header>
          <el-row>
            <h2>注文詳細</h2>
          </el-row>
        </template>
        <OrderEditForm :initial-value="order" :user="user" :items="items" @show-item-create-modal="showItem"
          @update="init" />
        <ItemCreateModal :show-close="isShownItem" :userId="user?._id" :orderId="order?._id" @click-outside="hideItem"
          @create="itemAdded" />
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>作業一覧</h2>
            <el-button @click="showTask">作業追加</el-button>
          </el-row>
        </template>
        <el-timeline>
          <el-timeline-item :timestamp="order?.createdAt ? format(order?.createdAt, 'yyyy/MMdd') : 'n/a'" placement="top"
            size="large" type="primary" :icon="LocationFilled">
            <el-card>
              <template #header>
                <el-row justify="space-between">
                  <el-col :span="12">
                    <h3 class="header-heading">
                      注文作成/{{ order?.createdAt ? format(order?.createdAt, 'yyyy/MM/dd') : 'n/a' }}
                    </h3>
                  </el-col>
                  <el-col :span="4">
                    <el-button @click="accept" size="large" type="primary"
                      :disabled="order?.status !== 'waiting'">受付する</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-card>
          </el-timeline-item>
          <el-timeline-item v-for="t in tasks" :key="t._id" :icon="t.isOutSource ? Van : HomeFilled"
            :timestamp="t.isFinished ? format(t.updatedAt, 'yyyy/MM/dd') : format(t.estinatedDeliveryDate, 'yyyy/MMdd')"
            placement="top" size="large" :type="t.isFinished ? 'success' : 'warning'">
            <TaskCard :task="t" :items="selectedItems" :suppliers="suppliers" @update="initTasks" />
          </el-timeline-item>
          <el-timeline-item
            :timestamp="order?.estinatedDeliveryDate ? format(order?.estinatedDeliveryDate, 'yyyy/MMdd') : 'n/a'"
            placement="top" size="large" :type="order?.status === 'complete' ? 'success' : 'info'" :icon="Box">
            <el-card>
              <template #header>
                <el-row justify="space-between">
                  <el-col :span="12">
                    <h3 class="header-heading">
                      納品予定日/{{ order?.estinatedDeliveryDate ? format(order?.estinatedDeliveryDate, 'yyyy/MM/dd') : 'n/a'
                      }}
                    </h3>
                  </el-col>
                  <el-col :span="4">
                    <el-button @click="complete" size="large" type="success"
                      :disabled="finishBtnDisabled">作業完了</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <TaskCreateModal :show-close="isShownTask" :userId="user?._id || null"
          :estinatedDeliveryDate="order?.estinatedDeliveryDate" :orderId="order?._id || null" :items="items"
          :suppliers="suppliers" @click-outside="hideTask" @create="taskAdded" />
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>操作</h2>
          </el-row>
        </template>
        <el-row>

          <el-button @click="abort" size="large" type="danger" :disabled="order?.status === 'aborted'">キャンセル</el-button>

        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import { useRoute } from 'vue-router';
import { format } from "date-fns";
import { User } from "../../../electron/model/users";
import {
  HomeFilled,
  LocationFilled,
  Van,
  Box
} from '@element-plus/icons-vue'
import { useTasksState } from "../../composables/tasks";
import { useItemsState } from "../../composables/item";
import { useOrderState } from "../../composables/order";
import { useSuppliersState } from "../../composables/suppliers";
import OrderEditForm from "../../components/form/order/Edit.vue";
import TaskCreateModal from "../../components/modal/TaskCreate.vue";
import { useModalState } from "../../composables/modal";
import ItemCreateModal from "../../components/modal/ItemCreate.vue";
import TaskCard from "../../components/card/Task.vue";
import { Item } from "../../../electron/model/items";
const route = useRoute()
const { isShown: isShownItem, show: showItem, hide: hideItem } = useModalState()
const { isShown: isShownTask, show: showTask, hide: hideTask } = useModalState()
const { tasks, get: getTasks, reset: resetTasks } = useTasksState()
const { items, get: getItems, reset: resetItems } = useItemsState()
const { order, get: getOrder, reset: resetOrder } = useOrderState()
const { suppliers, get: getSuppliers, reset: resetSuppliers } = useSuppliersState()

const itemAdded = async (newItemId: string) => {
  hideItem()
  const id = order.value?._id || ""
  if (id) {
    const beforeItems = order.value ? order.value.items : []
    const afterItems = Array.from(new Set([...beforeItems, newItemId]))
    await window.orderAPI.update(id, { items: afterItems })
  }
  await init()
}

const taskAdded = async () => {
  hideTask()
  await init()
}


const user = ref<User | null>(null)

const selectedItems = computed<Item[]>(() => {
  if (!order.value) return []
  return items.value.filter(i => order.value?.items.includes(i._id))
})

const init = async () => {
  resetOrder()
  resetItems()
  resetTasks()
  resetSuppliers()
  await getOrder(route.params.id.toString())
  await getSuppliers()
  await getUser(order.value?.userId || "")
  await getItems({ userId: order.value?.userId || "" })
  await initTasks()
}

const getUser = async (userId: string) => {
  const u = await window.userAPI.findById(userId)
  user.value = u
}

const accept = async () => {
  if (!order.value) return
  const id = order.value._id
  await window.orderAPI.accept(id)
  await init()
}

const abort = async () => {
  if (!order.value) return
  const id = order.value._id
  await window.orderAPI.abort(id)
  await init()
}
const complete = async () => {
  if (!order.value) return
  const id = order.value._id
  await window.orderAPI.complete(id)
  await init()
}
const finishBtnDisabled = computed<boolean>(() => {
  // 注文が無い
  if (!order.value) return true
  // 注文が進行中でない。
  if (order.value.status !== "inProgress") return true
  if (tasks.value.length === 0) return false
  // 未完了の工程がある
  const unfinishedTasks = tasks.value.filter(t => !t.isFinished)
  return unfinishedTasks.length > 0
})

const initTasks = async () => {
  resetTasks()
  await getTasks({ orderId: order.value?._id, userId: order.value?.userId }, { estinatedDeliveryDate: 1 })
}

init()

</script>

<style scoped>
.el-timeline {
  left: 6px !important;
  --el-timeline-node-size-large: 24px !important;
}

#content {
  min-height: calc(25vh - 36px);
}
</style>
