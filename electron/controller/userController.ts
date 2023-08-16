import { User,Users } from '../model/users';
import { find,findOne,insert,update,remove,_clear,Sort } from "../helper/dbHelper"

type InsertPayload =Omit<User,"_id"|"createdAt"|"updatedAt">
type UpdatePayload =Omit<User,"_id"|"createdAt"|"updatedAt">

export const userController = {
  find(option:{[T:string]:any},sort:Sort={}):Promise<User[]>{
    return find(Users,option,sort)
  },
  findById(id:string):Promise<User>{
    return findOne(Users,{_id:id})
  },
  insert(payload:InsertPayload):Promise<User>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      createdAt:new Date(),
      updatedAt: new Date()
    }
    return insert<User>(Users,data)
  },
  update(id:string,payload:UpdatePayload):Promise<number>{
    if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      updatedAt: new Date()
    }
    return update(Users,id,data)
  },
  delete(id:string):Promise<number>{
    return remove(Users,id)
  },
  _clear():Promise<number>{
        return _clear(Users)
  }
}