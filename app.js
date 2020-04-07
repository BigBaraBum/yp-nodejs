const express = require('express');
const path = require('path');
const api = require('./routes/api.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', api);

app.listen(PORT, () => {

});
