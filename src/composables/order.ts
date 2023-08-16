import { ref } from "vue";
import {Order} from "../../electron/model/orders";

export const useOrdersState =()=>{
  const orders = ref<Order[]>([])
  const get = async(query={})=>{
    const result= await window.orderAPI.find(query)
    orders.value = result
  }
  const reset =()=>{
    orders.value=[]
  }
  return {
    orders,
    reset,
    get,
  }
}

export const useOrderState =()=>{
  const order = ref<Order|null>(null)
  const get = async(id:string)=>{
    const result= await window.orderAPI.findById(id)
    order.value = result
  }
  const reset =()=>{
    order.value=null
  }
  return {
    order,
    reset,
    get,
  }
}
