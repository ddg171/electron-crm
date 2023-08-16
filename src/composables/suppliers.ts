import { ref } from "vue";
import {Supplier} from "../../electron/model/suppliers";

export const useSuppliersState =()=>{
  const suppliers = ref<Supplier[]>([])
  const get = async()=>{
    const result= await window.supplierAPI.find({})
    console.log(result)
    suppliers.value = result
  }
  const reset =()=>{
    suppliers.value=[]
  }
  return {
    suppliers,
    reset,
    get,
  }
}

export const useSupplierState =()=>{
  const supplier = ref<Supplier|null>(null)
  const get = async(id:string)=>{
    const result= await window.supplierAPI.findById(id)
    supplier.value = result
  }
  const reset =()=>{
    supplier.value=null
  }
  return {
    supplier,
    reset,
    get,
  }
}