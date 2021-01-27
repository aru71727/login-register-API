const express = require('express');
const router = express.Router();
const con = require('../auth//db_connection.js');
const async = require('async'); 
var cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post('/', async function(req,res){
    
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