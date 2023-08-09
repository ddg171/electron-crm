<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <h2>注文詳細</h2>
      <el-row>
        <el-col>
          <el-form label-width="240px">
            <el-form-item label="顧客">
              <el-input :value="user?.name||''" readonly aria-readonly="true" />
            </el-form-item>
            <el-form-item label="注文状況">
              <el-input :value="formatOrderStatus(order.status)" readonly aria-readonly="true" />
            </el-form-item>
            <el-form-item label="納品予定日">
              <el-date-picker v-model="order.estinatedDeliveryDate" />
            </el-form-item>
            <el-form-item :label="`お預かり品/現在${order.items.length||0}個`">
              <el-checkbox-group v-model="order.items">
                <el-tooltip v-for="i in items" :key="i._id" class="box-item" :content="`分類:${i.category}`"
                  placement="top-start">

                  <el-checkbox-button :label="i._id" :name="i.name">
                    {{ i.name }}</el-checkbox-button>
                </el-tooltip>
              </el-checkbox-group>
              <div>
                <el-button @click="show">品物追加</el-button>
              </div>
            </el-form-item>
            <el-form-item label="摘要欄">
              <el-input type="textarea" v-model="order.memo" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">update</el-button>
            </el-form-item>
          </el-form>
          <ItemCreateModal :show-close="isShown" :userId="user?._id" @click-outside="hide" @create="itemAdded" />
        </el-col>
      </el-row>
      <h2>工程管理</h2>
      <el-row>
        <ul>
          <li v-for="t in tasks"></li>
        </ul>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import{ref} from "vue"
import {useRoute} from 'vue-router';
import {Order} from "../../../electron/model/orders";
import {User} from "../../../electron/model/users";
import {Item} from "../../../electron/model/items";
// import {Task} from "../../../electron/model/tasks";
import {formatOrderStatus} from "../../utils/status"
import {useModalState} from "../../composables/modal";
import ItemCreateModal from "../../components/modal/ItemCreate.vue";
const {isShown,show,hide} = useModalState()
  const route = useRoute()

const itemAdded =async (id:string)=>{
  hide()
  if(!id)return
  order.value.items.push(id)
  submit()
}
const tasks=ref([])

const submit= async()=>{
  const id= route.params.id.toString()
  const items =JSON.parse(JSON.stringify(order.value.items));
  const payload={
    memo:order.value.memo,
    items,
  }
  await window.orderAPI.update(id,payload)
  const o = await window.orderAPI.findOne(id)
  console.log(o)
  order.value =o
}

const order =ref<Order>({
  _id:"",
  status:	"waiting",
  memo: "",
  taskTotalCount:	0,
  finishedTaskCount: 0,
  estinatedDeliveryDate: new Date(),
  userId:"",
  items: [],
  createdAt:new Date(),
  updatedAt:new Date(),
})

const items =ref<Item[]>([])
const user = ref<User|null>(null)
const init = async()=>{

  const id =route.params.id.toString()
  const o = await window.orderAPI.findOne(id)
  await getAllItems(o.userId)
  await getUser(o.userId)
  order.value =o
}

const getUser =async (userId:string)=>{
  const u = await window.userAPI.findOne(userId)
  user.value=u
}

const getAllItems =async(id:string)=>{
  const i = await window.itemAPI.find({userId:id})
  items.value=i
}

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
