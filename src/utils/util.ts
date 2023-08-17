export function convertNeDBResultToObj(arr:any[]):{[T:string]:any}{
    const obj:{[T:string]:any}={}
    arr.forEach((item)=>{
        obj[item._id]=item
    })
    return obj
}