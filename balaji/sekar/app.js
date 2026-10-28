
const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'college'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// CREATE
app.post('/add', (req, res) => {
    const { name, department } = req.body;

    db.query(
        'INSERT INTO students (name, department) VALUES (?, ?)',
        [name, department],
        err => {
            if (err) return res.status(500).send('Insert failed');
            res.send('Student Added Successfully');
        }
    );
});

// READ
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send('Read failed');
        res.json(results);
    });
});

// UPDATE
app.post('/update', (req, res) => {
    const { id, name, department } = req.body;

    db.query(
        'UPDATE students SET name=?, department=? WHERE id=?',
        [name, department, id],
        err => {
            if (err) return res.status(500).send('Update failed');
            res.send('Student Updated Successfully');
        }
    );
});

// DELETE
app.post('/delete', (req, res) => {
    db.query(
        'DELETE FROM students WHERE id=?',
        [req.body.id],
        err => {
            if (err) return res.status(500).send('Delete failed');
            res.send('Student Deleted Successfully');
        }
    );
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

