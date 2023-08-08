import { ref } from "vue";
import {Item} from "../../electron/model/items";

export const useItemsState =()=>{
  const items = ref<Item[]>([])
  const get = async(opt:any={})=>{
    const result= await window.itemAPI.find(opt)
    items.value = result
  }
  const reset =()=>{
    items.value=[]
  }
  return {
    items,
    reset,
    get,
  }
}
