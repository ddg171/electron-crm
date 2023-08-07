import { Item,Items } from '../model/items';

type InsertPayload =Omit<Item,"_id"|"createdAt"|"updatedAt">
type UpdatePayload =Omit<Item,"_id"|"userId"|"createdAt"|"updatedAt">

export interface ItemController {
  find: (option:{[T:string]:any}) =>Promise<Item[]>,
  findOne:(id:string)=>Promise<Item>,
  insert:(t:InsertPayload) => Promise<any>,
  update:(id:string,t:UpdatePayload) => Promise<any>,
  delete:(id:string)=>Promise<any>
}

export const itemController = {
  find(option:{[T:string]:any}){
    return new Promise((res,rej)=>{
      Items.find(option).exec(
        (err,doc)=>{
          if(err) return rej(err)
          return res(doc)
        })
      })
  },
  findOne(id:string){
    return new Promise((res,rej)=>{
      Items.findOne({"_id":id},(err,doc)=>{
        if(err) return rej(err)
        return res(doc)
      })
    })
  },
  insert(payload:InsertPayload){
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      createdAt:new Date(),
      updatedAt: new Date()
    }
    return new Promise((resolve,reject)=>{
      Items.insert(data,(err,doc)=>{
        if(err) return reject(err)
        resolve(doc)
       })

    })
  },
  update(id:string,payload:UpdatePayload){
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      updatedAt: new Date()
    }
    return new Promise((res)=>{
      res(Items.update({"_id":id},data))
    })
  },
  delete(id:string){
    return new Promise((res)=>{
      res(Items.remove({"_id":id}))
    })
  }
}