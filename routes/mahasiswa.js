const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa';

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', { mahasiswa: results });
    });
});

router.get('/tambah', (req, res) => {
    res.render('tambah');
});

router.post('/tambah', (req, res) => {
    const { nim, nama, jurusan, email } = req.body;

    const sql = 'INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES (?, ?, ?, ?)';

    db.query(sql, [nim, nama, jurusan, email], (err) => {
        if (err) throw err;
        res.redirect('/mahasiswa');
    });
});

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM mahasiswa WHERE id = ?', [id], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(404).send('Data mahasiswa tidak ditemukan');
        }

        res.render('edit', { mahasiswa: results[0] });
    });
});

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { nim, nama, jurusan, email } = req.body;

    const sql = 'UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ?, email = ? WHERE id = ?';

    db.query(sql, [nim, nama, jurusan, email, id], (err) => {
        if (err) throw err;
        res.redirect('/mahasiswa');
    });
});

router.post('/hapus/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM mahasiswa WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/mahasiswa');
    });
});

module.exports = router;
