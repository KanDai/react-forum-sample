const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("db/forum.db")

db.serialize(() => {
    db.run('CREATE TABLE forum (id integer primary key autoincrement, name, content, password)')
})

db.close()
