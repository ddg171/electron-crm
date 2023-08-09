import { User,Users } from '../model/users';

type InsertPayload =Omit<User,"_id"|"createdAt"|"updatedAt">
type UpdatePayload =Omit<User,"_id"|"createdAt"|"updatedAt">
export interface UserController {
  find: (option:{[T:string]:any}) =>Promise<User[]>,
  findOne:(id:string)=>Promise<User>,
  insert:(t:InsertPayload) => Promise<any>,
  update:(id:string,t:UpdatePayload) => Promise<any>,
  delete:(id:string)=>Promise<any>
}

export const userController = {
  find(option:{[T:string]:any}){
    return new Promise((res,rej)=>{
      Users.find(option).sort({name:1}).exec(
        (err,doc)=>{
          if(err) return rej(err)
          return res(doc)
        })
      })
  },
  findOne(id:string){
    return new Promise((res,rej)=>{
      Users.findOne({"_id":id},(err,doc)=>{
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
      Users.insert(data,(err,doc)=>{
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
      res(Users.update({"_id":id},{$set:data}))
    })
  },
  delete(id:string){
    return new Promise((res)=>{
      res(Users.remove({"_id":id}))
    })
  }
}