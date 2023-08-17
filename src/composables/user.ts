import {  ref } from "vue";
import {User} from "../../electron/model/users";
import {convertNeDBResultToObj} from "../utils/util";

export const useUsersState =()=>{
  const users = ref<User[]>([])
  const get = async()=>{
    const result= await window.userAPI.find({})
    users.value = result
  }
  const reset =()=>{
    users.value=[]
  }
  const find = (id:string):User|null=>{
    const obj =convertNeDBResultToObj(users.value)
    return obj[id]||null
  }
  return {
    users,
    reset,
    get,
    find
  }
}

export const useUserState =()=>{
  const user = ref<User|null>()
  const get = async(id:string)=>{
    const result= await window.userAPI.findById(id)
    user.value = result
  }
  const reset =()=>{
    user.value=null
  }
  return {
    user,
    reset,
    get,
  }
}