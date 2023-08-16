import { Supplier,Suppliers } from '../model/suppliers';
import { find,findOne,insert,update,remove,_clear,Sort } from "../helper/dbHelper"

type InsertPayload =Omit<Supplier,"_id"|"createdAt"|"updatedAt">
type UpdatePayload =Omit<Supplier,"_id"|"createdAt"|"updatedAt">

export const supplierController = {
  find(option:{[T:string]:any},sort:Sort={}):Promise<Supplier[]>{
    return find(Suppliers,option,sort)
  },
  findById(id:string):Promise<Supplier>{
    return findOne(Suppliers,{_id:id})
  },
  insert(payload:InsertPayload):Promise<Supplier>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      createdAt:new Date(),
      updatedAt: new Date()
    }
    return insert<Supplier>(Suppliers,data)
  },
  update(id:string,payload:UpdatePayload):Promise<number>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      updatedAt: new Date()
    }
    return update(Suppliers,id,data)
  },
  delete(id:string):Promise<number>{
    return remove(Suppliers,id)
  },
  _clear():Promise<number>{
        return _clear(Suppliers)
  }
}