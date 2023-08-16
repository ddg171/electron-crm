import path from 'path';
import Datastore from 'nedb';
import { filePath } from './common';
export interface Item {
  _id:string
  name:string
  category:string
  userId:string|null
  firstOrderId:string|null
  description:string
  isExist:boolean
  createdAt:Date
  updatedAt:Date
}

export const Items  = new Datastore({filename:path.join(filePath,"items.db"), autoload:true})

