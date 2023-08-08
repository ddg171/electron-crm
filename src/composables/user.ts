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
