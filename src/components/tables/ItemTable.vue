<template>
  <el-table :data="props.items" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="name" label="名前" />
    <el-table-column prop="category" label="分類" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="emits('detail',scope.row._id)">Detail</el-button>
        <el-button link type="primary" size="small" @click="emits('delete',scope.row._id)">削除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {Item} from "../../../electron/model/items";
interface Props{
  items:Item[]
}

interface Emits{
  (e:"detail",id:string):void,
  (e:"delete",id:string):void
  (e:"selected-items",v:Item[]):void
}

const handleSelectionChange = (v: Item[]):void => {
  emits("selected-items",v)
}

  const props = withDefaults(defineProps<Props>(),{items:()=>[]})
  const emits  = defineEmits<Emits>()
</script>