<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <el-card>
        <template #header>
          <el-row>
            <h2>操作</h2>
          </el-row>

        </template>
        <el-row>
          <el-button @click="showCreate">新規作成</el-button>
        </el-row>
        <el-row></el-row>
        <el-row>
          <SupplierCreateModal :showClose="createModalShown" @create="getSuppliers" @click-outside="hideCreate" />
        </el-row>
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>
              取引先一覧</h2>
          </el-row>
        </template>
        <el-row>
          <SupplierTable :suppliers="suppliers" @detail="showDetail" @delete="deleteUser" />
        </el-row>
        <SupplierEditModal :supplier="selectedSupplier" @click-outside="selectedId=null" @update="init" />
      </el-card>
      <!-- ここに中身 -->
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {ref,  computed} from "vue";
import {useModalState} from "../composables/modal"
import {useSuppliersState} from "../composables/suppliers"
import SupplierCreateModal from "../components/modal/SupplierCreate.vue"
import SupplierEditModal from "../components/modal/SupplierEdit.vue"
import SupplierTable from "../components/tables/SupplierTable.vue"

import {Supplier} from "../../electron/model/suppliers";

const {isShown:createModalShown,show:showCreate,hide:hideCreate }= useModalState()
const {suppliers,reset,get} =useSuppliersState()

const getSuppliers =async ()=>{
  createModalShown.value =false
  reset()
  await get()
}

interface Emits {
  (event: 'update'): void
}

defineEmits<Emits>()
const showDetail = (id:string)=>{
  selectedId.value = id
}

const selectedId= ref<string|null>(null)
const selectedSupplier = computed<Supplier|null>(()=>{
  if(!selectedId.value) return null
  return suppliers.value.find((s)=>s._id === selectedId.value)||null
})

const init =()=>{
  selectedId.value = null
  getSuppliers()
}

const deleteUser = async(id:string)=>{
  await window.userAPI.delete(id)
  await getSuppliers()
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
