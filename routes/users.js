const {client} = require('./database/configuration')

console.log("client....", client)
var express = require('express');
var router = express.Router();
//users create
router.post('/users', function (req, res) {
  id = req.body.id;
  username = req.body.name;
  email = req.body.email;
  phone_number = req.body.phone_number;
  address = req.body.address;
  var query = "Insert into users (id,name,email,phone_number,address) values ($1,$2,$3,$4,$5) RETURNING id,name";
  client.query(query,[id,username,email,phone_number,address], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result.rows[0]);
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
      res.send(result.rows);
    }
  })
})
//users delete
router.delete('/users/:id', function (req, res) {
  id = req.params.id;
  var query = "Delete from users where id=$1";
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
  username = req.body.name;
  email = req.body.email;
  phone_number = req.body.phone_number;
  address = req.body.address;

  var query = "Update users set name=$2,email=$3,phone_number=$4,address=$5 where id =$1 returning name,email,phone_number,address";
  
  client.query(query, [id, username,email, phone_number, address], function (err, result) {
    if (err) {
      console.log("edittt",err);
      res.send(err);
    }
    else {
      res.send(result.rows[0]);
    }
  })
})
router.get('/users/:id', function (req, res) {
  id = req.params.id;
  var query = "Select * from users where id =$1";
  client.query(query, [id], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result.rows);
    }
  })
})
module.exports = router;
