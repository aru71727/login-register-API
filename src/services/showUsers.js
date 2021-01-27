const express = require('express');
const router = express.Router();
const con = require('../auth/db_connection.js');
const async = require('async'); 
var cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post('/',  async function(req,res){
    
   
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