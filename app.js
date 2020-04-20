const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth.js');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);


app.use('/cards', cards);
app.use('/users', users);
app.use('/:any', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {

});
