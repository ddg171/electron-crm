import { Item,Items } from '../model/items';
import { find,findOne,insert,update,remove,_clear,Sort } from "../helper/dbHelper"
type InsertPayload =Omit<Item,"_id"|"createdAt"|"updatedAt">
type UpdatePayload =Omit<Item,"_id"|"userId"|"createdAt"|"updatedAt">


export const itemController = {
  find(option:{[T:string]:any},sort:Sort={}):Promise<Item[]>{
    return find(Items,option,sort)
  },
  findById(id:string):Promise<Item>{
    return findOne(Items,{_id:id})
  },
  insert(payload:InsertPayload):Promise<Item>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      createdAt:new Date(),
      updatedAt: new Date()
    }
    return insert<Item>(Items,data)
  },
  update(id:string,payload:UpdatePayload):Promise<number>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      updatedAt: new Date()
    }
    return update(Items,id,data)
  },
  delete(id:string):Promise<number>{
    return remove(Items,id)
  },
  _clear():Promise<number>{
        return _clear(Items)
  }
}