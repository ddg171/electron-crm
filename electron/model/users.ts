import path from 'path';
import Datastore from 'nedb';
import { filePath } from './common';
export interface User {
  _id:string
  name:string
  hurigana:string
  sex:"male"|"female"|"other"
  birthDay:Date
  createdAt:Date
  updatedAt:Date
}

export const Users  = new Datastore({filename:path.join(filePath,"user.db"), autoload:true})

