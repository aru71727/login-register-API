const express = require('express');
const router = express.Router();
const con = require('./db_connection.js');
const bodyParser = require('body-parser');
const async = require('async'); 
router.use(bodyParser.urlencoded({ extended: true })); 
var cookieParser = require("cookie-parser");
router.use(cookieParser());
const { checkToken } = require("./jwt_validation");

router.post('/',checkToken, async function(req,res){
    console.log("Inside Update profile..")
    id = req.decoded.user.id;
    const sql = "Update users set username = '" + req.body.username + "',address = '" + req.body.address + "' where id ="+ id +";"
    //console.log(sql);
    try{
    var result = await(con.fetch(sql));
        res.json({
            msg: "Profile Updated Successfully " 
        })
    }catch (error) {
        console.log(error)
        res.json({
            msg: "Error..." 
        })
      } 
     
});


module.exports = router;