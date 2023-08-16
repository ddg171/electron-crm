import path from 'path';
import Datastore from 'nedb';
import { filePath } from './common';
export interface Supplier {
  _id:string
  name:string
  isActive:boolean
  location:string
  zipCode:string
  tel:string
  fax:string
  email:string
  managerName:string
  createdAt:Date
  updatedAt:Date
}

export const Suppliers  = new Datastore({filename:path.join(filePath,"suppliers.db"), autoload:true})

