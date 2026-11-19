const express = require('express');
const db = require('./config/database');
const mahasiswaRoutes = require('./routes/mahasiswa');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/mahasiswa', mahasiswaRoutes);

app.get('/', (req, res) => {
    res.redirect('/mahasiswa');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
