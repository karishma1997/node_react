const {client} = require('./database/configuration')

console.log("client....", client)
var express = require('express');
const { password } = require('pg/lib/defaults');
var router = express.Router();
//users create
router.post('/users', function (req, res) {
  id = req.body.id;
  email = req.body.email;
  password = req.body.password;
  phone_number = req.body.password;
  address = req.body.address;
  var query = "Insert into users (id, email, password,phone_number,address) values (?,?,?,?,?)";
  client.query(query, [id, email, password, phone_number, address], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
})
//users read
router.get('/users', function (req, res) {
  var query = "Select * from users";
  client.query(query, function (err, result) {
    console.log("result.....", result);
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
})
//users delete
router.delete('/users/:id', function (req, res) {
  id = req.params.id;
  var query = "Delete * from users where id=?";
  client.query(query, [id], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
})
//users update
router.put('/users/:id', function (req, res) {
  id = req.params.id;
  email = req.body.email;
  password = req.body.password;
  phone_number = req.body.password;
  address = req.body.address;

  var query = "Update users set name=?,email=?,phone_number=?,address=? where id =?";
  client.query(query, [id, email, password, phone_number, address], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
})
router.get('/users/:id', function (req, res) {
  id = req.params.id;
  var query = "Select * from users where id =?";
  client.query(query, [id], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
})
module.exports = router;
