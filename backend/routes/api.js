const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const User = require('../models/user');
const events = require('../res/events');
const specialEvents = require('../res/special-events');

const mongoose = require('mongoose');
const db = 'mongodb+srv://coltla:ksbv27@cluster0.trvok.mongodb.net/eventsdb?retryWrites=true&w=majority'

mongoose.connect(db, (err) => {
  if (err) {
    console.error('ERROR:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('Unauthorized request');
  }

  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    res.status(401).send('Unauthorized request');
  }

  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (!payload) {
    res.status(401).send('Unauthorized request');
  }

  req.userId = payload.subject;
  next();
}

router.get('/', (req, res) => {
  res.send('From API route');
});

router.post('/register', (req, res) => {
  let registerData = req.body;
  let user = new User(registerData);
  user.save((err, registeredUser) => {
    if (err) {
      console.error('ERROR:', err);
    } else {
      let payload = {
        subject: registeredUser._id
      }

      let token = jwt.sign(payload, process.env.SECRET_KEY);
      res.status(200).send({ token });
    }
  });
});

router.post('/login', (req, res) => {
  let loginData = req.body;

  User.findOne({ username: loginData.username }, (err, user) => {
    if (err) {
      console.error('ERROR:', err);
      res.status(500).send('Something went wrong, please try again.');
    } else {
      if (!user) {
        res.status(401).send('Invalid username');
      } else {
        if (user.password !== loginData.password) {
          res.status(401).send('Invalid password');
        } else {
          let payload = {
            subject: user._id
          }

          let token = jwt.sign(payload, process.env.SECRET_KEY);
          res.status(200).send({ token });
            }
      }
    }
  });
});

router.get('/events', (req, res) => {
  res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
  res.json(specialEvents);
});

module.exports = router;