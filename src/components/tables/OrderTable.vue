<template>
  <el-table :data="props.orders" style="width: 100%">
    <el-table-column label="番号">
      <template #default="scope">
        {{ scope.row._id }}
      </template>
    </el-table-column>
    <el-table-column label="状況">
      <template #default="scope">
        {{ formatStatus(scope.row.status) }}
      </template>
    </el-table-column>
    <el-table-column label="顧客名">
      <template #default="scope">
        {{ userObj[scope.row.userId] || "不明" }}
      </template>
    </el-table-column>
    <el-table-column prop="createdDate" label="作成日">
      <template #default="scope">
        {{ formatDate(scope.row.createdAt) }}
      </template>
    </el-table-column>
    <el-table-column prop="updatedAt" label="最終更新日">
      <template #default="scope">
        {{ formatDate(scope.row.updatedAt) }}
      </template>
    </el-table-column>
    <el-table-column prop="estinatedDeliveryDate" label="お渡し予定日">
      <template #default="scope">
        {{ formatDate(scope.row.estinatedDeliveryDate) }}
      </template>
    </el-table-column>
    <el-table-column label="お預かり品数">
      <template #default="scope">
        {{ scope.row.items.length || 0 }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="$router.push(`/order/${scope.row._id}`)">Detail</el-button>
        <el-button link type="primary" size="small" @click="deleteOrder(scope.row._id)">delete</el-button>

      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Order } from "../../../electron/model/orders";
import { User } from "../../../electron/model/users";
import { format } from "date-fns";
import { formatOrderStatus } from "../../utils/formatter"
interface Props {
  orders: Order[]
  users: User[]
}

interface Emits {
  (e: "detail", id?: string): void,
  (e: "delete", id?: string): void
}
const formatDate = (d: Date) => {
  if (!d) return "/"
  return format(d, "yyyy/MM/dd")
}

const formatStatus = formatOrderStatus
const userObj = computed<{ [T: string]: string }>(() => {
  const obj: { [T: string]: string } = {}
  props.users.forEach((u: User) => {
    obj[u._id] = u.name
  })
  return obj
})

const deleteOrder = async (id: string) => {
  emits("delete", id)

}
const props = withDefaults(defineProps<Props>(), { orders: () => [], users: () => [] })
const emits = defineEmits<Emits>()
</script>