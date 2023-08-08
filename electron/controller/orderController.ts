import { Order,Orders} from '../model/orders';

type InsertPayload =Omit<Order,"_id"|"createdAt"|"status"|"updatedAt">
type UpdatePayload =Omit<Order,"_id"|"createdAt"|"updatedAt">
export interface OrderController {
  find: (option:{[T:string]:any}) =>Promise<Order[]>,
  findOne:(id:string)=>Promise<Order>,
  insert:(t:InsertPayload) => Promise<Order>,
  update:(id:string,t:UpdatePayload) => Promise<any>,
  delete:(id:string)=>Promise<any>
}

export const orderController = {
  find(option:{[T:string]:any}){
    return new Promise((res,rej)=>{
      Orders.find(option).exec(
        (err,doc)=>{
          if(err) return rej(err)
          return res(doc)
        })
      })
  },
  findOne(id:string){
    return new Promise((res,rej)=>{
      Orders.findOne({"_id":id},(err,doc)=>{
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
      status:"waiting",
      createdAt:new Date(),
      updatedAt: new Date()
    }
    return new Promise((resolve,reject)=>{
      Orders.insert(data,(err,doc)=>{
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
      res(Orders.update({"_id":id},data))
    })
  },
  delete(id:string){
    return new Promise((res)=>{
      res(Orders.remove({"_id":id}))
    })
  }
}