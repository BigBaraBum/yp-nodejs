const express = require('express');
const path = require('path');
const api = require('./routes/api.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
      _id: '5e8cefaab0d1134f106c5769' //Мой айди
  };
  next();
});
mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/', api);

app.listen(PORT, () => {

});
