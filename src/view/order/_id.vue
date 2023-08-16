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
            <h2>操作</h2>
          </el-row>
        </template>
        <el-row>
          <el-button @click="accept" size="large" :disabled="order?.status!=='waiting'">品物を受け取る。</el-button>
          <el-button @click="abort" size="large" :disabled="order?.status!=='aborted'">注文をキャンセルする。</el-button>
          <el-button @click="complete" size="large" :disabled="finishBtnDisabled">注文を完了する。</el-button>
        </el-row>
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>工程管理</h2>
            <el-button @click="showTask">工程追加</el-button>
          </el-row>
        </template>
        <el-row>
          <el-col :span="10">
            <h3>未完了</h3>
          </el-col>
          <el-col :span="10">
            <h3>完了</h3>
          </el-col>
        </el-row>
        <div v-for="t in tasks" :key="t._id">
          <el-row :justify="t.isFinished?'end':'start'">
            <el-col :span="18" class="task-list">
              <TaskCard :task="t" :items="items" :suppliers="suppliers" @update="initTasks" />
            </el-col>
          </el-row>
        </div>
        <TaskCreateModal :show-close="isShownTask" :userId="user?._id||null"
          :estinatedDeliveryDate="order?.estinatedDeliveryDate" :orderId="order?._id||null" :items="items"
          :suppliers="suppliers" @click-outside="hideTask" @create="taskAdded" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import{ref,computed} from "vue"
import {useRoute} from 'vue-router';

import {User} from "../../../electron/model/users";

import {useTasksState} from "../../composables/tasks";
import {useItemsState} from "../../composables/item";
import {useOrderState} from "../../composables/order";
import { useSuppliersState } from "../../composables/suppliers";
import OrderEditForm from "../../components/form/order/Edit.vue";
import TaskCreateModal from "../../components/modal/TaskCreate.vue";
import {useModalState} from "../../composables/modal";
import ItemCreateModal from "../../components/modal/ItemCreate.vue";
import TaskCard from "../../components/card/Task.vue";
const route = useRoute()
const {isShown:isShownItem,show:showItem,hide:hideItem} = useModalState()
const {isShown:isShownTask,show:showTask,hide:hideTask} = useModalState()
const {tasks,get:getTasks,reset:resetTasks} = useTasksState()
const {items,get:getItems,reset:resetItems} = useItemsState()
const {order,get:getOrder,reset:resetOrder} = useOrderState()
const {suppliers,get:getSuppliers,reset:resetSuppliers} = useSuppliersState()

const itemAdded =async (newItemId:string)=>{
  hideItem()
  const id = order.value?._id||""
  if(id) {
    const beforeItems = order.value? order.value.items:[]
    const afterItems = Array.from(new Set([...beforeItems,newItemId]))
    await window.orderAPI.update(id,{items:afterItems})
  }
  await init()
}

const taskAdded =async ()=>{
  hideTask()
  await init()
}


const user = ref<User|null>(null)

const init = async()=>{
  resetOrder()
  resetItems()
  resetTasks()
  resetSuppliers()
  await getOrder(route.params.id.toString())
  await getSuppliers()
  await getUser(order.value?.userId||"")
  await getItems({userId:order.value?.userId||""})
  await initTasks()
}

const getUser =async (userId:string)=>{
  const u = await window.userAPI.findById(userId)
  user.value=u
}

const accept = async()=>{
  if(!order.value) return
  const id = order.value._id
  await window.orderAPI.accept(id)
  await init()
}

const abort = async()=>{
  if(!order.value) return
  const id = order.value._id
  await window.orderAPI.abort(id)
  await init()
}
const complete =async()=>{
  if(!order.value) return
  const id = order.value._id
  await window.orderAPI.complete(id)
  await init()
}
const finishBtnDisabled =computed<boolean>(()=>{
  // 注文が無い
  if(!order.value) return true
  // 注文が進行中でない。
  if(order.value.status !== "inProgress") return true
  if(tasks.value.length === 0) return false
  // 未完了の工程がある
  const unfinishedTasks = tasks.value.filter(t=>!t.isFinished)
  return unfinishedTasks.length > 0
})

const initTasks=async ()=>{
  resetTasks()
  await getTasks({orderId:order.value?._id,userId:order.value?.userId},{estinatedDeliveryDate:1})
}

init()

</script>

<style scoped>
.task-list {
  list-style: none;
  width: 100%;
}

#content {
  min-height: calc(25vh - 36px);
}
</style>
