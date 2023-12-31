<template>
  <el-form label-width="240px">
    <el-form-item label="顧客">
      <el-input :value="user?.name || ''" readonly aria-readonly="true" />
    </el-form-item>
    <el-form-item label="注文状況">
      <el-input :value="formatOrderStatus(props.initialValue?.status || '')" readonly aria-readonly="true" />
    </el-form-item>
    <el-form-item label="納品予定日">
      <el-date-picker v-model="form.estinatedDeliveryDate" />
    </el-form-item>
    <el-form-item :label="`お預かり品/現在${props.initialValue?.items.length || 0}個`">
      <el-checkbox-group v-model="form.items">
        <el-tooltip v-for="i in shownItems" :key="i._id" class="box-item" :content="`分類:${i.category}`"
          placement="top-start">
          <el-checkbox-button :label="i._id" :name="i.name">
            {{ i.name }}</el-checkbox-button>
        </el-tooltip>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="">
      <el-row>
        <el-switch v-model="isShowAllItems" inactive-text="全ての品物を表示" />
        <el-button @click="emits('show-item-create-modal')">品物追加</el-button>
      </el-row>
    </el-form-item>
    <el-form-item label="摘要欄">
      <el-input type="textarea" v-model="form.memo" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" size="large"
        :disabled="props.initialValue?.status === 'aborted'">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue"

import { Order } from "../../../../electron/model/orders";
import { User } from "../../../../electron/model/users";
import { Item } from "../../../../electron/model/items";
import { formatOrderStatus } from "../../../utils/formatter"


interface Props {
  initialValue: Order | null
  user: User | null
  items: Item[]
}
const props = withDefaults(
  defineProps<Props>(),
  {
    initialValue: null,
    user: null,
    items: () => []
  })
const isShowAllItems = ref<boolean>(false)
const shownItems = computed<Item[]>(() => {
  if (isShowAllItems.value) {
    return props.items
  }
  return props.items.filter(i => i.firstOrderId === props.initialValue?._id)
})

interface Emits {
  (e: "update", id: string): void
  (e: "show-item-create-modal"): void
}
const emits = defineEmits<Emits>()

type OrderFormValues = Omit<Order, "_id" | "status" | "userId" | "createdAt" | "updatedAt">
const form = reactive<OrderFormValues>({
  memo: "",
  estinatedDeliveryDate: new Date(),
  items: [],
})

const sync = () => {
  console.log("sync", props.initialValue)
  if (!props.initialValue) return
  form.memo = props.initialValue.memo
  form.estinatedDeliveryDate = props.initialValue.estinatedDeliveryDate
  form.items = props.initialValue.items
}

const submit = async () => {
  const id = props.initialValue?._id
  if (!id) return
  const items: string[] = JSON.parse(JSON.stringify(form.items));
  const exsitedItems = items.filter((i: string) => props.items.find((item: Item) => item._id === i))
  const payload = {
    memo: form.memo,
    items: exsitedItems,
    estinatedDeliveryDate: form.estinatedDeliveryDate
  }
  await window.orderAPI.update(id, payload)
  emits("update", id)
  sync()
}

watch(() => props.initialValue, (v: Order | null) => {
  if (!v) return
  sync()
})

sync()
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
../../../utils/formatter