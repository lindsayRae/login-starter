const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/**
 * @description CREATE a new user
 */
router.post('/register', async (req, res) => {
  console.log('req.body', req.body);
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
  console.log(('newUser', newUser));
  res.send(newUser);
  //     //? Need to create a header for the creation of the blank you document in personalRecord
  //     let headers = {
  //       'Content-Type': 'application/json',
  //     };
  //     const token = user.generateAuthToken();

  //     //? Call out to existing endpoint to create a new PR record with empty arrays (lifts, cardio, skills)

  //     //! For the backend you need an absolute URL for the fetch method to work
  //     let baseURL = process.env.baseURL;
  //     let url = `${baseURL}/api/users/usersetup/${newUser._id}`;

  //     let response = await fetch(url, {
  //       method: 'POST',
  //       headers: headers,
  //     });

  //     let json = await response.json();

  //     sendEmail(user.userName, user.email, user.GUID);
  //     res.send({
  //       jwt: token,
  //       user: _.pick(user, ['userName', 'email', '_id', 'activated']),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send({
  //       message: 'There was a problem creating your user, please try again later',
  //     });
  //   }
});

module.exports = router;
