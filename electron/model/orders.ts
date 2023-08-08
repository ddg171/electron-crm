import path from 'path';
import Datastore from 'nedb';
import { filePath } from './common';
export interface Order {
  _id:string
  status:	"waiting"|"inProgress"|"compolate"|"aborted"
  memo: string
  taskTotalCount:	number
  finishedTaskCount: number
  estinatedDeliveryDate: Date
  userId:string
  items: string[]
  createdAt:Date
  updatedAt:Date
}

export const Orders  = new Datastore({filename:path.join(filePath,"orders.db"), autoload:true})

