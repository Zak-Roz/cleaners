const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./app/routes/api');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/data', express.static('data'));
const mongoose = require('mongoose');

const config = require('./app/config/db.config'); 
const apps = config['app'];
const port = apps['port'] || 8080;

const dbUrl = 'mongodb://localhost:27017/tkt';
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to zak-roz application.' });
});

app.use('/api', apiRouter);

app.listen(port, async() => {
  console.log(`🚀 Server is running on port http://localhost:${port}.`);
  try {
    await mongoose.connect(dbUrl, connectOptions);
    console.log('🚀 Mongo database connected');
    // const { Right, StatusUser, StatusOrder } = require('./app/models');
    // await Right.insertMany([
    //   { _id: 1, name: 'user' },
    //   { _id: 2, name: 'admin' },
    // ]);
    // await StatusUser.insertMany([
    //   { _id: 1, name: 'noactivity' },
    //   { _id: 2, name: 'active' },
    //   { _id: 3, name: 'rejection' },
    // ]);
    // await StatusOrder.insertMany([
    //   { _id: 1, name: 'В обробці' },
    //   { _id: 2, name: 'Готовий до видачі' },
    //   { _id: 3, name: 'Повернення' },
    //   { _id: 4, name: 'Виконано!' },
    // ]);
    console.log('StatusUser and Right done!');
  } catch(err) {
    console.log(err.toString());
  }
});