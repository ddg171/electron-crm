import { Task,Tasks} from '../model/tasks';
import { find,findOne,insert,update,remove,_clear,Sort, updateMany } from "../helper/dbHelper"
import {Items} from '../model/items';

type InsertPayload =Omit<Task,"_id"|"createdAt"|"status"|"updatedAt">
type UpdatePayload =Partial<Omit<Task,"_id"|"createdAt"|"updatedAt">>


export const taskController = {
  // 全件取得
  find(option:{[T:string]:any},sort:Sort={}):Promise<Task[]>{
    return find(Tasks,option,sort)
  },
  // 1件取得
  findById(id:string):Promise<Task>{
    return findOne(Tasks,{_id:id})
  },
  // 1件追加
  insert(payload:InsertPayload):Promise<Task>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      createdAt:new Date(),
      updatedAt: new Date()
    }
    return insert<Task>(Tasks,data)
  },
  // 1件更新
  update(id:string,payload:UpdatePayload):Promise<number>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      updatedAt: new Date()
    }
    return update(Tasks,id,data)
  },
  updateMany(option:{[T:string]:any},payload:UpdatePayload):Promise<number>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      updatedAt: new Date()
    }
    return updateMany(Tasks,option,data)
  },

  // 工程が完了した際の処理
  // 関連する品物の状態も更新する
  async finish(id:string):Promise<number>{
    const doc = await findOne(Tasks,{_id:id})
    const consumedItems = doc?.consumedItems || []
    // 消費した品物の処理
    if(consumedItems.length){
      const d ={
        isExist:false,
        updatedAt: new Date()
      }
      updateMany(Items,{_id:{$in:consumedItems}},{$set:d})
    }
    // 取り寄せ、生産した商品の処理
    const producedItems = doc?.producedItems || []
    if(producedItems.length){
      const d ={
        isExist:true,
        updatedAt: new Date()
      }
      updateMany(Items,{_id:{$in:producedItems}},{$set:d})
    }
    return await update(Tasks,id,{isFinished:true})
  },
  // 工程が完了した際の処理
  // 関連する品物の状態も更新する
  async undo(id:string):Promise<number>{
    const doc = await findOne(Tasks,{_id:id})
    const consumedItems = doc?.consumedItems || []
    // 消費した品物の処理
    if(consumedItems.length){
      const d ={
        isExist:true,
        updatedAt: new Date()
      }
      await updateMany(Items,{_id:{$in:consumedItems}},{$set:d})
    }
    // 取り寄せ、生産した商品の処理
    const producedItems = doc?.producedItems || []
    if(producedItems.length){
      const d ={
        isExist:false,
        updatedAt: new Date()
      }
      await updateMany(Items,{_id:{$in:producedItems}},{$set:d})
    }
    return await update(Tasks,id,{isFinished:false})
  },
  // 1件削除
  delete(id:string):Promise<number>{
    return remove(Tasks,id)
  },
  // 全件削除
  _clear():Promise<number>{
        return _clear(Tasks)
  }
}

