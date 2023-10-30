import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    user: 'ivan',
    host: 'localhost',
    password: '123456',
    database: 'exemplo'
})
db.connect((err) => {
    if (err) console.log(err)
    else console.log('Connected to database')
})

/* --- CRUD USUÁRIOS --- */
// Create
app.post('/usuarios', (req, res) => {
   
   console.log(req.args)
    
    const { nome, senha } = req.body
    db.query('INSERT INTO usuarios (nome, senha) VALUES (?, ?)', [nome, senha], (err, result) => {
        if (err) res.send({ ok: false })
        else res.send({ ok: true })
    })
    
})
// Read
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, result) => {
        if (err) res.send({ 'err': err })
        else res.send(result)
    })
})
// Update
app.put('/usuarios/:id', (req, res) => {
    const { nome, senha } = req.body
    const { id } = req.params
    db.query('UPDATE usuarios SET nome = ?, senha = ? WHERE id = ?', [nome, senha, id], (err, result) => {
        if (err) res.send({ ok: false })
        else res.send({ ok: true })
    })
})
// Delete
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) res.send({ ok: false })
        else res.send({ ok: true })
    })
})

/* --- START SERVER --- */
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
