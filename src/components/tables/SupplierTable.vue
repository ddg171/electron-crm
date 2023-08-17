<template>
  <el-table :data="props.suppliers" style="width: 100%">
    <el-table-column prop="name" label="名前">
      <template #default="scope">
        <router-link :to="`/task?supplierId=${scope.row._id}`">{{ scope.row.name }}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="電話番号">
      <template #default="scope">
        <el-link :href="'tel:' + scope.row.tel" target="_blank">{{ scope.row.tel }}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="メールアドレス">
      <template #default="scope">
        <el-link :href="'mailto:' + scope.row.email" target="_blank">{{ scope.row.email }}</el-link>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="emits('detail', scope.row._id)">Detail</el-button>
        <el-button link type="primary" size="small" @click="emits('delete', scope.row._id)">削除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { Supplier } from "../../../electron/model/suppliers";
interface Props {
  suppliers: Supplier[]
}

interface Emits {
  (e: "detail", id: string): void,
  (e: "delete", id: string): void
}

const props = withDefaults(defineProps<Props>(), { suppliers: () => [] })
const emits = defineEmits<Emits>()
</script>