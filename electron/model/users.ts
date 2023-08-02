import Datastore from 'nedb';

export interface User {
  _id:string
  name:string
  sex:"male"|"female"|"other"
  birthDay:Date
  createdAt:Date
  updatedAt:Date
}

export class Users extends Datastore {
  constructor(pathOrOptions?: string | Datastore.DataStoreOptions | undefined){
    super(pathOrOptions)
  }
}

