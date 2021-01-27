const express = require('express');
const router = express.Router();
const con = require('./db_connection.js');
const bodyParser = require('body-parser');
const async = require('async'); 
router.use(bodyParser.urlencoded({ extended: true })); 
var cookieParser = require("cookie-parser");
router.use(cookieParser());
const { checkToken } = require("./jwt_validation");

router.post('/', checkToken, async function(req,res){
    
   
    const sql = "select id, username, email, address from users;"
    try{
    var result = await(con.fetch(sql));
        res.json({
            msg: result 
        })
    }catch (error) {
        res.json({
            msg: "Error " 
        })
      } 
     
});


module.exports = router;