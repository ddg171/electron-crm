<template>
  <el-table :data="props.user" style="width: 100%">
    <el-table-column prop="name" label="名前" />
    <el-table-column prop="sex" label="性別">
      <template #default="scope">
        {{ formatGender(scope.row.sex) }}
      </template>
    </el-table-column>
    <el-table-column label="誕生日">
      <template #default="scope">
        {{ formatDate(scope.row.birthDay) }}
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
import { format } from "date-fns";
import { User } from "../../../electron/model/users";
import { formatGender } from "../../utils/formatter";
interface Props {
  user: User[]
}

const formatDate = (d: Date | undefined) => {
  if (!d) return "n/a"
  return format(d, "yyyy年MM月dd日")
}
interface Emits {
  (e: "detail", id: string): void,
  (e: "delete", id: string): void
}

const props = withDefaults(defineProps<Props>(), { user: () => [] })
const emits = defineEmits<Emits>()
</script>