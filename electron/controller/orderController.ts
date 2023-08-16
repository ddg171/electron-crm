import { Order,Orders} from '../model/orders';
import { find,findOne,insert,update,remove,_clear,Sort,removeMany } from "../helper/dbHelper"
import {Tasks} from '../model/tasks';

type InsertPayload =Omit<Order,"_id"|"createdAt"|"status"|"updatedAt">
type UpdatePayload =Partial<Omit<Order,"_id"|"createdAt"|"updatedAt">>

export const orderController = {
  find(option:{[T:string]:any},sort:Sort={}):Promise<Order[]>{
    return find(Orders,option,sort)
  },
  findById(id:string):Promise<Order>{
    return findOne(Orders,{_id:id})
  },
  insert(payload:InsertPayload):Promise<Order>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      status:"waiting",
      createdAt:new Date(),
      updatedAt: new Date()
    }
    return insert<Order>(Orders,data)
  },
  update(id:string,payload:UpdatePayload):Promise<number>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
    }
    return update(Orders,id,data)
  },
  async delete(id:string):Promise<number>{
    const tasks = await find(Tasks,{orderId:id})
    const taskIds = tasks.map(task=>task._id)
    // タスクも全部消す。
    await removeMany(Tasks,{orderId:{$in:taskIds}})
    const r = remove(Orders,id)
    return r
  },
  _clear():Promise<number>{
        return _clear(Orders)
  },
  accept(id:string){
    return update(Orders,id,{status:"inProgress"})
  },
  complete(id:string){
    return update(Orders,id,{status:"complete"})
  },
  abort(id:string){
    return update(Orders,id,{status:"aborted"})
  },
}

