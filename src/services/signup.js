const express = require('express');
const router = express.Router();
var crypto = require('crypto'); 
const con = require('../auth/db_connection.js');
const async = require('async'); 

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true })); 

router.get('/', function(req,res){
   res.send("Welcome to Signup page..!!");
});

router.post('/', async function(req,res){
    try{
    var sql = "Select * from users where email = " + "'" + req.body.email+ "'  ;"
    var result = await(con.fetch(sql));
    if(result.length>0){
      res.json({
        message: "Email already exsists..."
      });
    }
    else{
    if(req.body.password === req.body.cpassword){
     const hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
     console.log('hashed password',hash);
     sql = "INSERT INTO users (username, email, password, address) VALUES ( '" + req.body.username + "', '" + req.body.email + "','" + hash+ "','" + req.body.address + "')";
  
     var result = await(con.fetch(sql));
    res.json({
        message: "Registration Successful...!!"
      });
    }else{
      res.json({
        msg: "Passwords are not matching"
      });
    }
    }
  }
  catch (error) {
        console.log(error)
        res.json({
            message: "Error...!!"
          });
     }  
    
});


module.exports = router;