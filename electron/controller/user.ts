import { User } from './../model/users';
import models from '../model/models';

export interface UserController {
  find: () =>User[],
  findOne:()=>User,
  insert:(t:Omit<User,"_id">) => Promise<any>,
  delete:(id:string)=>Promise<any>
}

export const userController ={
  find(option:{[T:string]:any}){
    return new Promise((res,rej)=>{
      models.Users.find(option).exec(
        (err,doc)=>{
          if(err) return rej(err)
          return res(doc)
        })
      })
  },
  findOne(id:string){
    return new Promise((res,rej)=>{
      models.Users.findOne({"_id":id},(err,doc)=>{
        if(err) return rej(err)
        return res(doc)
      })
    })
  },
  insert(payload:Omit<User,"_id"|"createdAt"|"updatedAt">){
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      createdAt:new Date(),
      updatedAt: new Date()
    }
    return new Promise((res)=>{
      res(models.Users.insert(data))
    })
  },
  update(id:string,payload:Omit<User,"_id"|"createdAt">){
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      createdAt:new Date(),
      updatedAt: new Date()
    }
    return new Promise((res)=>{
      res(models.Users.update({"_id":id},data))
    })
  },
  delete(id:string){
    return new Promise((res)=>{
      res(models.Users.remove({"_id":id}))
    })
  }
}