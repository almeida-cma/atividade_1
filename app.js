const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        // Criação da tabela se não existir
        db.run('CREATE TABLE IF NOT EXISTS emails (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)');
    }
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Rota para salvar o email no banco de dados
app.post('/saveEmail', (req, res) => {
    const email = req.body.email;

    // Verifica se o email é válido (pode adicionar validações mais robustas)
    if (email && email.trim() !== '' && email.includes('@')) {
        // Insere o email na tabela 'emails'
        db.run('INSERT INTO emails (email) VALUES (?)', [email], (err) => {
            if (err) {
                console.error('Erro ao inserir o email no banco de dados:', err.message);
                res.status(500).send('Erro interno ao salvar o email.');
            } else {
                res.send('Email salvo com sucesso!');
            }
        });
    } else {
        res.status(400).send('Email inválido.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});