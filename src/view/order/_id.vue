<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <b-row>
        <b-col>
          <!-- ここに中身 -->
          注文詳細:{{ order?._id }}
          <p>注文者: {{ user?.name }}</p>
          <p>状況:{{ formatStatus(order?.status||"") }}</p>
          <p>メモ:{{ order?.memo }}</p>
        </b-col>
      </b-row>
      <b-row>
        <ItemTable :items="items" />
      </b-row>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import{ref} from "vue"
import {useRoute} from 'vue-router';
import {Order} from "../../../electron/model/orders";
import {User} from "../../../electron/model/users";
import {Item} from "../../../electron/model/items";
import ItemTable from "../../components/tables/ItemTable.vue";
import {formatOrderStatus} from "../../utils/status"
const formatStatus =formatOrderStatus

const order =ref<Order|null>(null)
const items =ref<Item[]>([])
const user = ref<User|null>(null)
const init = async()=>{
  const route = useRoute()
  const id =route.params.id.toString()
  const o = await window.orderAPI.findOne(id)
  console.log(o)
  order.value=o
  await getItems(o.items)
  await getUser(o.userId)
}

const getUser =async (userId:string)=>{
  const u = await window.userAPI.findOne(userId)
  user.value=u
}

const getItems =async(idList:string[])=>{
  if(idList.length===0) return []
  const i = await window.itemAPI.find({_id:{$in:idList}})
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
