<template>
  <el-table :data="props.user" style="width: 100%">
    <el-table-column prop="name" label="名前" />
    <el-table-column prop="" label="ID" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="emits('detail',scope.row._id)">Detail</el-button>
        <el-button link type="primary" size="small" @click="emits('delete',scope.row._id)">削除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {User} from "../../../electron/model/users";
interface Props{
  user:User[]
}

interface Emits{
  (e:"detail",id:string):void,
  (e:"delete",id:string):void
}

  const props = withDefaults(defineProps<Props>(),{user:()=>[]})
  const emits  = defineEmits<Emits>()
</script>