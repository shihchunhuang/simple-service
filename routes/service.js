var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
const ACCOUNT_FILENAME = 'accounts.json';
var json = JSON.parse(fs.readFileSync(`./${ACCOUNT_FILENAME}`,'utf8'));

router.get('/current', verifyToken, function(req, res, next) {
    jwt.verify(req.token, 'secretKey', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            const email = data['email'];
            // res.send({current: json[email]['current']});
            res.render('service', {type: 'Current Integer', key: json[email]['current']});
            res.end();
        }
    })
});

router.get('/next', verifyToken, function(req, res, next) {
    jwt.verify(req.token, 'secretKey', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            const email = data['email'];
            var newCurrent = ++json[email]['current'];
            updateFile(email, newCurrent);
            // res.send({next: newCurrent});
            res.render('service', {type: 'Next Integer', key: newCurrent});
            res.end();
        }
    })
});

router.get('/set-current', verifyToken, function(req, res, next) {
    jwt.verify(req.token, 'secretKey', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            const email = data['email'];
            const newCurrent = req.query.current;
            updateFile(email, newCurrent);
            res.render('service', {type: 'You have set integer to', key: newCurrent});
            res.end();
        }
    })
});

function verifyToken(req, res, next) {
    // if using postman, set headers
    // const bearerHeader = req.headers['Authorization'];
    // if using jade UI
    const bearerHeader = req.query.token;

    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' '); 
      const bearerToken = bearer[0];
      req.token =  bearerToken;
      next();
    }else {
      res.sendStatus(403);
    }
}

function updateFile(email, newCurrent) {
    json[email]['current'] = newCurrent;
    fs.writeFileSync(`./${ACCOUNT_FILENAME}`, JSON.stringify(json));
}


module.exports = router;