const express = require('express');
const app = express();
const port = process.env.PORT || 1234;

const postsRouter = require('./routes/posts');

app.use('/api/posts', postsRouter);

if (process.env.NODE_ENV === 'production') {
  // serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
