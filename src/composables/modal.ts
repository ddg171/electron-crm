import{ref} from "vue"

export const useModalState = (openCallback:(()=>void)|undefined = undefined,closecallback:(()=>void)|undefined = undefined)=>{
  const isShown  =ref<boolean>(false)
  const show = ()=>{
    isShown.value=true
    if(typeof openCallback=== "function"){
      openCallback()
    }
  }
  const hide =()=>{
    isShown.value=false
    if(typeof closecallback=== "function"){
      closecallback()
    }
  }
  return{
    isShown,
    show,
    hide
  }
}