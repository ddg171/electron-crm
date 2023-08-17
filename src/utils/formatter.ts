const formatter =(obj:{[T:string]:string},emptyStatus:string="不明")=>(key:string)=>obj[key]||emptyStatus


const orderStatus:{[T:string]:string} ={
  waiting:"お預かり待ち",
  inProgress:"作業中",
  complete:"完了",
  aborted:"中断"
}
export const formatOrderStatus =formatter(orderStatus)
const orderColor:{[T:string]:string} ={
  waiting:"info",
  inProgress:"primary",
  complete:"success",
  aborted:"error"
}
export const formatOrderColor =formatter(orderColor,"info")


const genders:{[T:string]:string} ={
  male:"男",
  female:"女",
  other:"その他",
}
export const formatGender=formatter(genders,"その他")