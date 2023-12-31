import { ref } from "vue";
import {Task} from "../../electron/model/tasks";

export const useTasksState =()=>{
  const tasks = ref<Task[]>([])
  const get = async(opt:any={},sort:any={})=>{
    const result= await window.taskAPI.find(opt,sort)
    tasks.value = result
  }
  const reset =()=>{
    tasks.value=[]
  }
  return {
    tasks,
    reset,
    get,
  }
}
