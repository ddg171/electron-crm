import path from 'path';
import Datastore from 'nedb';
import* as remote from '@electron/remote'


declare const __static: string;

// todo try loading db from userData

const fileName = path.join(remote.app.getPath("userData"), "data.db")

const db = new Datastore({filename:fileName, autoload:true})

export { db };


class Table extends Datastore{
    constructor()
}