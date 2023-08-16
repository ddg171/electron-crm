<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <el-card>
        <template #header>
          <el-row>
            <h2>新規受付</h2>
          </el-row>
        </template>
        <OrderCreateForm :users="users" :userId="userId" ref="form" :submitButtonShown="false" @user-select="userSelect"
          @click-add-customer="showCustomerModal" @submit="$router.push(`/order/${$event}`)" />
        <UserCreateModal :show-close="isCustomerModalShown" @create="initUsers" @click-outside="hideCustomerModal" />

      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import OrderCreateForm from "../../components/form/order/Create.vue"
import UserCreateModal from "../../components/modal/UserCreate.vue"
import {useModalState} from '../../composables/modal'
import {useUsersState} from "../../composables/user";
import {useRoute} from "vue-router";

const route = useRoute()
const query = route.query
const userId = ref<string|null>(query.userId as string)

const {isShown:isCustomerModalShown,show:showCustomerModal,hide:hideCustomerModal} =useModalState()

const {users,get:getUsers,reset:resetUsers}=useUsersState()



const selectedUserId = ref<string>("")
const initUsers = async ()=>{
  hideCustomerModal()
  resetUsers()
  await getUsers()
}
const userSelect =(id:string)=>{
  selectedUserId.value=id
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
