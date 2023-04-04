const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bdusuarios'
})



app.get('/usuarios', (req, res) => {
    db.query("SELECT * FROM usuarios", (err, rows, field) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    })
});



app.post('/register', (req, res) => {
    const { nombre, email, informacion, password } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, email, informacion ,password) VALUES (?, ?, ?,?)';
    db.query(sql, [nombre, email, informacion, password], (err, result) => {
        if (err) {
            console.error('Error al insertar usuario: ' + err.stack);
            res.status(500).send('Error al crear usuario.');
            return;
        }
        res.status(200).send('Usuario creado con éxito.');
    });
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const values = [req.body.email,
    req.body.password]
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    db.query(sql, [...values, email, password], (err, result) => {
        if (err) {
            console.error('Error al buscar usuario: ' + err.stack);
            res.status(500).send('Error al iniciar sesión.');
            return;
        }
        if (result.length === 0) {
            res.status(401).send('Credenciales incorrectas.');
            return;
        }
        res.status(200).send('Inicio de sesión exitoso.');
    });
});

app.delete("/usuarios/:id", (req, res) => {
    const userId = req.params.id
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json("Usuario eliminado correctamente")
        }
    })
})

app.put("/usuarios/:id", (req, res) => {
    const userId = req.params.id
    const values = [
        req.body.nombre,
        req.body.informacion
    ]
    const sql = 'UPDATE usuarios SET `nombre` = ? , `informacion` = ? WHERE id = ? ';
    db.query(sql, [...values, userId], (err, result) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json("Usuario editado correctamente")
        }
    })
})


app.listen(4000, () => {
    console.log("El server esta funcionando")
})

module.exports = db