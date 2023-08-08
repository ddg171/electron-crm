import { ref } from "vue";
import {Order} from "../../electron/model/orders";

export const useOrdersState =()=>{
  const orders = ref<Order[]>([])
  const get = async()=>{
    const result= await window.orderAPI.find({})
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
