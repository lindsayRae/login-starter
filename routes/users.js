const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const { sendEmail } = require('../middleware/email');
const auth = require('../middleware/auth');
/**
 * @description CREATE a new user
 */
router.post('/register', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send({ message: 'User already registered.' });
  }
  if (req.body.password.length < 8) {
    return res
      .status(400)
      .send({ message: 'Password must be at least 8 characters' });
  }
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;

  // chose not to use pick method because of hardcoded activated and GUID
  user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email.toLowerCase(),
    password: password,
    GUID: uuidv4(),
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //   try {
  let newUser = await user.save();

  sendEmail(newUser.firstName, newUser.lastName, newUser.email, newUser.GUID);
  res.send(newUser);
});

/**
 * @description DELETE user
 */
router.delete('/deleteaccount/:id', auth, async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.deleteOne({ _id: id });

    if (user.deletedCount == 0) {
      return res.send({ message: 'Error trying to delete user account' });
    }
    res.send({ removed: true });
  } catch (err) {
    res.send({ message: error.message });
  }
});

/**
 * @description generate new GUID to reset password
 */

router.put('/reset', async (req, res) => {
  console.log('in /reset...');
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log('user: ', user);
    if (!user) {
      return res.status(400).send({
        message: 'If this account is registered you will receive an email.',
      });
    }

    user.GUID = uuidv4();
    let result = await user.save();

    console.log('result', result);
    sendEmailReset(user.firstName, user.lastName, user.email, user.GUID);

    return res.send({
      user: _.pick(user, [
        'firstName',
        'lastName',
        'email',
        '_id',
        'activated',
        'GUID',
      ]),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'There was a problem with the server, please try again later.',
    });
  }
});
module.exports = router;
