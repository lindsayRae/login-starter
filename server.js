const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 1234;
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MogoDB database connection established successfully');
});

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
  console.log('in production');
  // serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
