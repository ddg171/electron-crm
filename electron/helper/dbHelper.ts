import Datastore from 'nedb';

export class NotFoundError extends Error{
    constructor(message:string){
        super(message);
        this.name = 'NotFoundError';
    }
}

export class AlreadyExistsError extends Error{
    constructor(message:string){
        super(message);
        this.name = 'AlreadyExistsError';
    }
}

export class ValidationError extends Error{
    constructor(message:string){
        super(message);
        this.name = 'ValidationError';
    }
}


export type Sort = {
  [T:string]:1|-1
}

export const find =<T=any>(db:Datastore,query:any,sort:Sort={}):Promise<T[]>=>new Promise((resolve,reject)=>{
    db.find(query).sort(sort).exec((err:Error|null,docs:T[])=>{
        if(err) reject(err);
        resolve(docs);
    })
}
)
export const findOne =<T=any>(db:Datastore,query:any):Promise<T>=>new Promise((resolve,reject)=>{
    db.findOne(query,(err:Error|null,docs:T)=>{
        if(err) reject(err);
        resolve(docs);
    })
}
)

export const insert =<T=any>(db:Datastore,doc:any):Promise<T>=>new Promise((resolve,reject)=>{
    db.insert(doc,(err:Error|null,docs)=>{
        if(err) reject(err);
        resolve(docs);
    })
}
)
export const update =(db:Datastore,id:string,doc:any):Promise<number>=>new Promise((resolve,reject)=>{
    db.update({_id:id},{$set:doc},{},(err:Error|null,numberOfUpdated: number)=>{
        if(err) reject(err);
        resolve(numberOfUpdated);
    })
}
)

export const updateMany =(db:Datastore,query:any,doc:any):Promise<number>=>new Promise((resolve,reject)=>{
    db.update(query,{$set:doc},{multi:true},(err:Error|null,numberOfUpdated: number)=>{
        if(err) reject(err);
        resolve(numberOfUpdated);
    })
}
)

export const remove =(db:Datastore,id:string):Promise<number>=>new Promise((resolve,reject)=>{
    db.remove({_id:id},(err:Error|null,numRemoved:number)=>{
        if(err) reject(err);
        resolve(numRemoved);
    })
}
)

export const removeMany =(db:Datastore,query:any):Promise<number>=>new Promise((resolve,reject)=>{
    if(!query|| Object.keys(query).length===0) throw new Error()
    db.remove(query,{ multi: true },(err:Error|null,numRemoved:number)=>{
        if(err) reject(err);
        resolve(numRemoved);
    })
}
)

export const _clear =(db:Datastore):Promise<number>=>new Promise((resolve,reject)=>{
    db.remove({}, { multi: true }, (err:Error|null, numRemoved:number)=>{
        if(err) reject(err);
        resolve(numRemoved);
    })
}
)

export const count =(db:Datastore,query:any):Promise<number>=>new Promise((resolve,reject)=>{
    db.count(query,(err:Error|null,count:number)=>{
        if(err) reject(err);
        resolve(count);
    })
}
)
