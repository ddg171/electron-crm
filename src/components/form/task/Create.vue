<template>
  <el-form label-width="240px">
    <el-form-item label="工程名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="外注・取り寄せならチェック">
      <el-switch v-model="form.isOutSource" />
    </el-form-item>
    <el-form-item label="取引先">
      <el-select v-model="form.supplierId">
        <el-option label="選択" value="" />
        <el-option v-for="s in props.suppliers" :key="s._id" :label="s.name" :value="s._id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <template #label>
        納品予定日
      </template>
      <el-row>
        <el-col class="date-picker-col">
          <el-date-picker v-model="form.estinatedDeliveryDate" />
        </el-col>
        <el-col class="date-picker-col">
          <el-button @click="sub(14)">-2週間</el-button>
          <el-button @click="add(14)">+2週間</el-button>
        </el-col>
        <el-col class="date-picker-col" v-if="props.estinatedDeliveryDate">
          <span class="block">
            ※注文納品日:{{format(props.estinatedDeliveryDate,'yyyy/MM/dd')}}
          </span>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item :label="`この工程に関わる品物`">
      <el-checkbox-group v-model="form.items">
        <el-tooltip v-for="i in props.items" :key="i._id" class="box-item" :content="`分類:${i.category}`"
          placement="top-start">
          <el-checkbox-button :label="i._id" :name="i.name">
            {{ i.name }}</el-checkbox-button>
        </el-tooltip>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item :label="`この工程で消費する品物`">
      <el-checkbox-group v-model="form.consumedItems">
        <el-tooltip v-for="i in selectedItems" :key="i._id" class="box-item" :content="`分類:${i.category}`"
          placement="top-start">
          <el-checkbox-button :label="i._id" :name="i.name" :disabled="form.producedItems.includes(i._id)">
            {{ i.name }}</el-checkbox-button>
        </el-tooltip>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item :label="`この工程で取り寄せる品物`">
      <el-checkbox-group v-model="form.producedItems">
        <el-tooltip v-for="i in selectedItems" :key="i._id" class="box-item" :content="`分類:${i.category}`"
          placement="top-start">
          <el-checkbox-button :label="i._id" :name="i.name" :disabled="form.consumedItems.includes(i._id)">
            {{ i.name }}</el-checkbox-button>
        </el-tooltip>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="メモ">
      <el-input v-model="form.memo" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import{reactive,computed}from "vue"
import {Item} from "../../../../electron/model/items";
import {Task} from "../../../../electron/model/tasks";
import {format} from "date-fns"
import { addDays,subDays} from "date-fns"
import {Supplier} from "../../../../electron/model/suppliers";

interface Props{
  userId:string|null
  orderId:string|null
  items:Item[]
  estinatedDeliveryDate:Date|null
  suppliers:Supplier[]
}
const props =withDefaults(defineProps<Props>(),{userId:null,estinatedDeliveryDate:null,orderId:null,items:()=>[],suppliers:()=>[]})

const selectedItems =computed(()=>props.items.filter(i=>form.items.includes(i._id)))


type NewItemFormValues= Omit<Task,"_id"|"createdAt"|"updatedAt"|"isFinished"|"userId"|"orderId">
interface Emits {
  (e:"submit",id:string):void
  (e:"click-add-supplier"):void
}
const emits=defineEmits<Emits>()

const form =reactive<NewItemFormValues>(
  {
    name:"",
    memo:"",
    isOutSource:false,
    supplierId:"",
    items:[],
    consumedItems:[],
    producedItems:[],
    estinatedDeliveryDate:new Date(),
  }
)

const reset=()=>{
  form.name=""
  form.memo=""
  form.isOutSource=false
  form.supplierId=""
  form.estinatedDeliveryDate=new Date()
}

const add =(d:number)=>{
  form.estinatedDeliveryDate = addDays(form.estinatedDeliveryDate,d)
}
const sub =(d:number)=>{
  form.estinatedDeliveryDate = subDays(form.estinatedDeliveryDate,d)
}


const submit =async ()=>{
  const {name,memo,estinatedDeliveryDate,isOutSource,supplierId,items,consumedItems,producedItems} =form
  if(!props.orderId||!props.userId) return
  const payload ={
    name,
    memo,
    estinatedDeliveryDate,
    isOutSource,
    isFinished:false,
    supplierId:supplierId?supplierId:null,
    userId:props.userId,
    orderId:props.orderId,
    items:JSON.parse(JSON.stringify(items)),
    consumedItems:JSON.parse(JSON.stringify(consumedItems)),
    producedItems:JSON.parse(JSON.stringify(producedItems)),
  }
  console.log(payload)
  const r= await window.taskAPI.insert(payload)
  const id =r._id
  console.log("submit:order",id)

  emits("submit",id)
  reset()
}

defineExpose({
  submit
})

</script>

<style scoped>
.date-picker-col {
  text-align: left;
}
</style>