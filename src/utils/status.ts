export const formatOrderStatus =(status:string):string =>{
  const m:{[T:string]:string} ={
    waiting:"お預かり待ち",
    inProgress:"作業中",
    compolate:"完了",
    aborted:"中断"
  }
  return m[status]||"不明"
}