const express = require('express');
const router = express.Router();
const con = require('../auth/db_connection.js');
const bodyParser = require('body-parser');
const async = require('async'); 
router.use(bodyParser.urlencoded({ extended: true })); 
var cookieParser = require("cookie-parser");
router.use(cookieParser());
var crypto = require('crypto'); 

router.post('/', async function(req,res){
    //console.log("Inside Update Password..")
    //console.log(req.decoded.user.id);
    id = req.decoded.user.id;
    if(req.body.newpassword != req.body.cnewpassword){
        res.json({
            msg: " Password and confirm password doesn't match.." 
        });
    }
    
    try{
    const hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
    var sql = "Select * from users where id =  "+ id +";"
    var result = await(con.fetch(sql));
    if(hash === result[0].password){
       const  newhash = crypto.createHash('sha256').update(req.body.newpassword).digest('base64');
        sql = "Update users set password = '" + newhash + "' where id = " +id + ";"
    
        result = await(con.fetch(sql));
        res.json({
            msg: "Password Updated Successfully " 
        });

    }
    else{
        res.json({
            msg: " old Password is Incorrect.." 
        });
    }
    }catch (error) {
        console.log(error)
        res.json({
            msg: "Error..." 
        })
      } 
     
});


module.exports = router;