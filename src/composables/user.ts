import { ref } from "vue";
import {User} from "../../electron/model/users";

export const useUsersState =()=>{
  const users = ref<User[]>([])
  const get = async()=>{
    const result= await window.userAPI.find({})
    users.value = result
  }
  const reset =()=>{
    users.value=[]
  }
  return {
    users,
    reset,
    get,
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