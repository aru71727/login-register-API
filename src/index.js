const express = require('express');
const app = express();
const signup = require('./services/signup.js');
const login = require('./services/login.js');
const deleteUser = require('./services/deleteUser.js');
const showUsers = require('./services/showUsers.js');
const updateProfile = require('./services/updateProfile.js');
const changePassword = require('./services/changePassword.js');
const logout = require('./services/logout.js');
const session = require('express-session');
var cookieParser = require("cookie-parser");
const { checkToken } = require("./auth/jwt_validation");
const con = require('./auth/db_connection.js');


app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());

    app.use(
        session({
          key: "user_sid",
          secret: "somerandonstuffs",
          resave: false,
          saveUninitialized: false,
          cookie: {
            expires: 600000,
          },
        })
      );

      app.use((req, res, next) => {
        if (req.cookies.user_sid && !req.session.user) {
          res.clearCookie("user_sid");
        }
        next();
      });

      var sessionChecker = async(req, res, next) => {
          
        if (req.session.user && req.cookies.user_sid) {
         // res.redirect("/dashboard");
         //console.log(req.cookies.jwt);
         
         const sql = "Select * from users where id = " + "'" + req.session.user.id+ "';"
         var result = await(con.fetch(sql));
            console.log(req.session.user.id , req.cookies.user_sid)
            res.json({
                message: 'Profile Details' ,
                msg: result
                
            });

        } else {
          next();
        }
      };
    
app.get("/",sessionChecker,(req, res) => {
    console.log(req.session.user,'index_page');
    res.json({
        message: "Home Page...!!"
      });
   // res.redirect("/login");
   // res.send("Home page")
  });

  app.use('/signup', signup);
  app.use('/login', login);
  app.use('/deleteUser',checkToken,deleteUser);
  app.use('/showUsers',checkToken,showUsers);
  app.use('/updateProfile',checkToken,updateProfile);
  app.use('/changePassword',checkToken,changePassword);
  app.use('/logout',checkToken,logout);


  
console.log('-------',process.env.JWT_KEY)
  
app.listen('8000');