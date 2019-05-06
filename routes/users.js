var express = require('express');
var router = express.Router();
var fs = require('fs');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const ACCOUNT_FILENAME = 'accounts.json';

/* Render register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Please register' });
});

/* Render login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please login' });
});



router.post('/register', function(req, res, next) {
  // md5 hash password
  const pwHashed = crypto.createHash('md5').update(req.body.pw).digest('hex');
  req.body.pw = pwHashed;
  const user = {};
  user[req.body.email] = {pw: req.body.pw, current: 0};
  var json = JSON.parse(fs.readFileSync(`./${ACCOUNT_FILENAME}`, 'utf8'));
  if(Object.keys(json).includes(req.body.email)) {
    res.render('error', {message: 'This email has been used'});
  } else {
    var accounts = Object.assign(user, json);
    fs.writeFile(ACCOUNT_FILENAME, JSON.stringify(accounts), function(err) {
        if (err) {
          res.send(err.message);
        } else{
          res.render('login', {title: 'You have successfully registered. Please login.'});
          res.end();
        }
    });
  }
});

router.post('/login', function (req, res) {
  const email = req.body.email;
  const pwHashed = crypto.createHash('md5').update(req.body.pw).digest('hex');
  var json = JSON.parse(fs.readFileSync(`./${ACCOUNT_FILENAME}`, 'utf8'));
  if(Object.keys(json).includes(email)) {
    if(json[email]['pw'] === pwHashed){
      jwt.sign({email}, 'secretKey', function(err, token) {
        if(err) {
          throw err;
        } else {
          res.render('home', {token});
        }
      }) 
    }else{
      res.render('error', {message: "Password is not correct"})
    }
  }else{
    res.render('error', {message: "Please register an account first"});
  }
});

module.exports = router;
