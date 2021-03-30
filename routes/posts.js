const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Hello Login Starter, from post.js',
    },
  ]);
});

module.exports = router;
