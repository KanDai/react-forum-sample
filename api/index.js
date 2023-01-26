const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("db/forum.db")
const port = 3000
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


//GETメソッド 全て取得
app.get('/api/v1/forum', (_, res) => {
    db.serialize(() => {
        db.all("select * from forum order by id desc", (err, rows) => {
            if (!err) {
                const newRows = rows.map(row => {
                    const { id, name, content } = row
                    return {
                        id, name, content
                    }
                })
                sleep(2000).then(() => res.json(newRows))
            }
        })
    })
});

//GETメソッド 1件だけ抽出
app.get('/api/v1/forum/:id', (req, res) => {
    const id = req.params.id
    db.serialize(() => {
        db.get(`select * from forum where id = ${id}`, (err, row) => {
            if (!err) {
                if (!row) return res.status(404).send('Not Found')

                const { id, name, content } = row
                sleep(2000).then(() => {
                    res.json({
                        id, name, content
                    })
                })
            }
        });
    });
});

//POSTメソッド 1件追加
app.post('/api/v1/forum', (req, res) => {
    const { name, content, password } = req.body

    if (!name || !content || !password) {
        return sleep(2000).then(() => res.status(500).send('入力が不正です'))
    }

    db.serialize(() => {
        db.exec(`insert into forum (name, content, password) values("${name}","${content}","${password}")`, (stat, error) => {
            sleep(2000).then(() => res.send('success create'))
        });
    });
});

//DELETEメソッド 1件削除
app.delete('/api/v1/forum/:id', (req, res) => {
    const id = req.params.id
    const { password } = req.body

    db.serialize(() => {
        db.get(`select * from forum where id = ${id}`, (err, row) => {
            if (err) return console.error(err)

            if (row.password !== password) {
                return sleep(2000).then(() => res.status(400).send('パスワードが違います'))
            }

            db.exec(`delete from forum where id = ${id}`, (stat, error) => {
                sleep(2000).then(() => res.send('success delete'))
            });
        });
    });
});

// PUTメソッド 1件更新
app.put('/api/v1/forum/:id', (req, res) => {
    const id = req.params.id
    const { name, content, password } = req.body

    db.get(`select * from forum where id = ${id}`, (err, row) => {
        if (err) return console.error(err)

        if (row.password !== password) {
            return sleep(2000).then(() => res.status(400).send('パスワードが違います'))
        }

        db.serialize(() => {
            db.exec(`update forum set name = "${name}", content = "${content}" where id = ${id}`, (stat, error) => {
                sleep(2000).then(() => res.send('success update'))
            });
        });
    });
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);