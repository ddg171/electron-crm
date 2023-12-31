import path from 'path';
import Datastore from 'nedb';
import { filePath } from './common';
export interface Task {
  _id:string
  name:string
  memo:string
  isFinished:boolean
  orderId:string
  userId:string
  isOutSource:boolean
  supplierId:string|null
  items:string[]
  consumedItems:string[]
  producedItems:string[]
  estinatedDeliveryDate:Date
  createdAt:Date
  updatedAt:Date
}

export const Tasks  = new Datastore({filename:path.join(filePath,"tasks.db"), autoload:true})

