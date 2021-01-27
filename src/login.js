const express = require('express');
const router = express.Router();
const con = require('./db_connection.js');
const bodyParser = require('body-parser');
const async = require('async'); 
router.use(bodyParser.urlencoded({ extended: true })); 
const jwt = require("jsonwebtoken");
var crypto = require('crypto'); 



router.get('/', function(req,res){
    res.send(`<h2> Login Form</h2>
    <form action="login" method="post" >
    <label>User Name :</label>
    <input type="text" name="email" id="username" required ="true"/>
    <label>Password :</label> 
    <input type="password" name="password" id="password" required ="true"/>
    <input type="submit" id="submit" value="Login"/> `);
    //console.log(req.session);
    res.end();
});



router.post('/',async function(req,res){
    
    sess = req.session;
    username = req.body.email;
    console.log("username: "+username);
    //pass = req.body.password;
    const hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
    const sql = "Select * from users where email = " + "'" + username + "'  ;"
    
    try{
    var result = await(con.fetch(sql));
    
    if(result.length<1){
        //console.log("Email does not exsist");
        res.json({
            msg: "Email does not exsist"
          });
        //return res.redirect('/login');
    }
    else if(hash != result[0].password){
        //console.log("Password is incorrect");
        res.json({
            msg: "Password is incorrect"
          });
        //return res.redirect('/login');
    }
    else{
        const user =  result[0];
        console.log('Hashed Password: ',hash);
       // console.log(user)

        jwt.sign({user}, 'secretkey', { expiresIn: '30000000s' }, (err, token) => {
            res.json({
              token,
              msg: {
                id: result[0].id,
                email : result[0].email,
                username: result[0].username,
                address : result[0].address,
                created_at : result[0].created_at

              }
            });
           // console.log(token)
          
         });

        //  res.cookie("jwt", token,{
        //    expires : new Date(Date.now()+ 30000),
        //    httpOnly : true
        //  });
       
        req.session.user = result[0];
        //console.log(req.session.user, 'login');
        
        // return res.render('home',  
        // msg = { username : result[0].username, 
        //     email : result[0].email , 
        //     address : result[0].address,
        // }
    
        // );
        //console.log(result);
      
    }
    }catch (error) {
        console.log(error)
      } 
});


module.exports = router;