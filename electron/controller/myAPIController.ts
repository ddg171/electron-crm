
import {db} from "../model/getdb"

export const myAPIController={
  find: () => {
    return new Promise((resolve,reject)=>{
       db.find({}).sort({deadline:1}).exec((err,doc)=>{
        if(err){
          return reject(err)
        }
        resolve(doc)
       })
    })
  },
  insert: (payload:any) => {
    const data ={
      ...payload,
      createdAt:new Date(),
      updatedAt:new Date()
    }
    data.deadline= new Date(data.deadline)
    return new Promise((resolve,reject)=>{
       db.insert(data,(err,doc)=>{
        if(err){
          reject(err)
        }
        resolve(doc)

       })
    })
  },
  delete:(id:string)=>{
    return new Promise((resolve)=>{
      resolve(db.remove({_id:id}))
    })
  }
}