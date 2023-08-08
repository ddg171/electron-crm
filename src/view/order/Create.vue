<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">

      <el-row>
        <el-col>
          <OrderCreateForm :users="users" ref="form" :items="selectedItems" :submitButtonShown="true"
            @user-select="userSelect" @click-add-customer="showCustomerModal" />
        </el-col>

        <UserCreateModal :show-close="isCustomerModalShown" @create="initUsers" @click-outside="hideCustomerModal" />
      </el-row>
      <el-row>
        <el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button @click="showItemModal">品物を追加</el-button>
          <ItemTable :items="items" @selected="itemSelected" />
          <ItemCreateModal :show-close="isItemModalShown" :user-id="selectedUserId" @create="initItems(selectedUserId)"
            @click-outside="hideItemModal" />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button @click="formSubmit">作成</el-button></el-col></el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {ref ,watch} from "vue"
import OrderCreateForm from "../../components/form/order/Create.vue"
import UserCreateModal from "../../components/modal/UserCreate.vue"
import ItemCreateModal from "../../components/modal/ItemCreate.vue"
import ItemTable from "../../components/tables/ItemTable.vue"
import {useModalState} from '../../composables/modal'
import {useUsersState} from "../../composables/user";
import {useItemsState} from "../../composables/item";
import {Item} from "electron"

const {isShown:isCustomerModalShown,show:showCustomerModal,hide:hideCustomerModal} =useModalState()
const {isShown:isItemModalShown,show:showItemModal,hide:hideItemModal} =useModalState()

const {users,get:getUsers,reset:resetUsers}=useUsersState()

interface VueElemRef {
    submit:any
}
const form = ref<VueElemRef| null>(null);
const formSubmit=()=>{
  console.log("ex")
  form.value!.submit()
}

const selectedItems =ref<Item[]>([])
const itemSelected=(v:Item[])=>{
  selectedItems.value=v
}

const selectedUserId = ref<string>("")
const initUsers = async ()=>{
  hideCustomerModal()
  resetUsers()
  await getUsers()
}
const userSelect =(id:string)=>{
  selectedUserId.value=id
}

watch(selectedUserId,(v:string)=>{
  initItems(v)
  selectedItems.value=[]
})

const {items,get:getItems,reset:resetItems} = useItemsState()

const initItems = async(userId:string|undefined=undefined)=>{
  console.log(userId)
  resetItems()
  if(!userId) return
  await getItems({userId})
}

initUsers()

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
