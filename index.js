const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 4001;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '48613244',
    database: 'apptodo'
});
db.connect();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.get('/', (req, res) => {
    res.send('<div style="text-align:center;"> <h1>Hello Welcome to Web Services</h1> </div>')
})





/*SELECT * FROM DATA todos */
app.get('/todos', (req, res) => {
    let sql = 'SELECT * FROM todos'
    db.query(sql, (err, results) => {
        if (err) { throw err }
        console.log(results)
        res.json(results)
    })
})


/* INSERT DATA IN  todos */
app.post('/todos', (req, res) => {
    let postData = req.body;
    let sql = 'INSERT INTO todos SET ?';
    let sql2 = 'INSERT INTO items SET ?';

    db.query(sql, postData, (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });

    db.query(sql2, postData, (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    })
});

/* UPDATE DATA  */
app.put('/todos', (req, res) => {
    let sql = 'UPDATE `todos` SET `text`=?,`archive`=? WHERE `id`=? ';
    let sql2 = 'UPDATE `items` SET `text`=?,`archive`=? WHERE `id`=? ';
    db.query(sql, [req.body.text, req.body.archive, req.body.id], (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    })
    db.query(sql2, [req.body.text, req.body.archive, req.body.id], (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    })
})

app.put('/todos/edit', (req, res) => {
    let sql = 'UPDATE `todos` SET `archive`=? WHERE `id`=? ';
    let sql2 = 'UPDATE `items` SET `archive`=? WHERE `id`=? ';
    db.query(sql, [req.body.archive, req.body.id], (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    })
    db.query(sql2, [req.body.archive, req.body.id], (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    })
})


/* DELETE DATA IN  todos */
app.delete('/todos', (req, res) => {
    let id = req.body.id;
    console.log(req.body);
    let sql = 'DELETE FROM `todos` WHERE `id`=?';
    let sql2 = 'DELETE FROM `items` WHERE `id`=?';
    db.query(sql, id, (error, results) => {
        if (error) throw error;
        res.end('Record has been deleted!', results);
    });
    db.query(sql2, id, (error, results) => {
        if (error) throw error;
        res.end('Record has been deleted!', results);
    });
});





app.get('/items', (req, res) => {
    let sql = 'SELECT * FROM items'
    db.query(sql, (err, results) => {
        if (err) { throw err }
        console.log(results)
        res.json(results)
    })
})




app.listen(port, () => {
    console.log(`server listening in your port ${port}`);
});