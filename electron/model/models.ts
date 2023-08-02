import path from 'path';
import* as remote from '@electron/remote'
import {Users} from "./users"


declare const __static: string;

// todo try loading db from userData

const filePath = remote.app.getPath("userData")

export default {
  Users:new Users(path.join(filePath,"user.db"))
}
