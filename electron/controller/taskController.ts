import { Task,Tasks} from '../model/tasks';

type InsertPayload =Omit<Task,"_id"|"createdAt"|"status"|"updatedAt">
type UpdatePayload =Omit<Task,"_id"|"createdAt"|"updatedAt">
export interface TaskController {
  find: (option:{[T:string]:any}) =>Promise<Task[]>,
  findOne:(id:string)=>Promise<Task>,
  insert:(t:InsertPayload) => Promise<Task>,
  update:(id:string,t:Partial<UpdatePayload>) => Promise<any>,
  finish:(id:string)=>Promise<any>,
  itemTask:(id:string,itemId:string,isFinished:boolean)=>Promise<any>,
  delete:(id:string)=>Promise<any>
}

const _update = (id:string,payload:Partial<UpdatePayload>)=>{
  if(!payload){
      throw new Error()
    }
    const data ={
      ...payload,
      updatedAt: new Date()
    }
    return new Promise((res)=>{
      res(Tasks.update({"_id":id},{$set:data}))
    })
  }

 const _findOne=(id:string):Promise<Task>=>{
    return new Promise((res,rej)=>{
      Tasks.findOne({"_id":id},(err,doc)=>{
        if(err) return rej(err)
        return res(doc)
      })
    })
  }
export const taskController = {
  find(option:{[T:string]:any}){
    return new Promise((res,rej)=>{
      Tasks.find(option).exec(
        (err,doc)=>{
          if(err) return rej(err)
          return res(doc)
        })
      })
  },
  findOne(id:string){
    return _findOne(id)
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
      Tasks.insert(data,(err,doc)=>{
        if(err) return reject(err)
        resolve(doc)
       })

    })
  },
  update(id:string,payload:UpdatePayload){
    return _update(id,payload)
  },
  itemTask(id:string,itemId:string,isFinished:boolean){
    return new Promise((res)=>{
      res(Tasks.update({"_id":id},{$set:{[`itemTasks.${itemId}`]:isFinished,updatedAt:new Date()}}))
    })
  },
  async finish(id:string){
    const t = await _findOne(id)
    if(!t) throw new Error("Task not found")
    const itemTasks = t.itemTasks
  const keys = Object.keys(itemTasks)
  const newItemTasks:{[T:string]:boolean} = {}
  keys.forEach(async (key)=>{
    newItemTasks[key] = true
  })
  return _update(id,{isFinished:true,itemTasks:newItemTasks})
  },
  delete(id:string){
    return new Promise((res)=>{
      res(Tasks.remove({"_id":id}))
    })
  }
}