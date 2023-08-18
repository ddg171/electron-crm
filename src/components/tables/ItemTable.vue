<template>
  <el-table :data="props.items" style="width: 100%">
    <el-table-column prop="_id" label="番号" />
    <el-table-column prop="name" label="名前" />
    <el-table-column prop="category" label="分類" />
    <el-table-column label="注文番号">
      <template #default="scope">
        <el-button v-if="scope.row.firstOrderId" link type="primary" size="small"
          @click="$router.push(`/order/${scope.row.firstOrderId}`)">{{ scope.row.firstOrderId }}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="状況">
      <template #default="scope">
        {{ scope.row.isExist? "店内/お客様":"店外/使用済み" }}
      </template>
    </el-table-column>
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

}


  const props = withDefaults(defineProps<Props>(),{items:()=>[]})
  const emits  = defineEmits<Emits>()
</script>