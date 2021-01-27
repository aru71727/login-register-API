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
    
    username = req.body.email;
    const sql = "Delete from users where id ="+ id +";"
    try{
    var result = await(con.fetch(sql));
        res.json({
            msg: "User Deleted Successfully " 
        })
    }catch (error) {
        res.json({
            msg: "Error " 
        })
      } 
     
});


module.exports = router;