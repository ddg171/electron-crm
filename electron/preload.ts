
import {contextBridge } from "electron"
import {db} from "./model/getdb"
import {userController,UserController} from "./controller/user"


contextBridge.exposeInMainWorld("user",userController)

contextBridge.exposeInMainWorld('myAPI', {
  find: () => {
    return new Promise((resolve,reject)=>{
       db.find({}).sort({deadline:1}).exec((err,doc)=>{
        if(err){
          return reject(err)
        }
        resolve(doc)
       })
    })
  },
  insert: (payload:any) => {
    const data ={
      ...payload,
      createdAt:new Date(),
      updatedAt:new Date()
    }
    data.deadline= new Date(data.deadline)
    return new Promise((resolve)=>{
       resolve(db.insert(data))
    })
  },
  delete:(id:string)=>{
    return new Promise((resolve)=>{
      resolve(db.remove({_id:id}))
    })
  }
})

interface Task {
  _id?:string
  text:string
  isFinished:boolean
  deadline:Date|string
  createdAt?:Date|string
  updatedAt?:Date|string
}


export interface myAPI {
  find: () => Promise<Task[]>,
  insert:(t:Task) => Promise<any>,
  delete:(id:string)=>Promise<any>
}

declare global {
  interface Window {
    myAPI: myAPI
    user:UserController
  }
}


function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      parent.removeChild(child)
    }
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = ev => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)
