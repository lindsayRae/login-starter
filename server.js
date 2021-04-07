require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 1234;
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const privateKey = process.env.login_jwtPrivateKey;

if (!privateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  // 0 is success, anything else is failure
  process.exit(1);
}
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
const auth = require('./routes/auth');
const activateRouter = require('./routes/activate');

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', auth);
app.use('/api/activate', activateRouter);

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
