const express = require('express');
const app = express();
const signup = require('./signup.js');
const login = require('./login.js');
const deleteUser = require('./deleteUser.js');
const showUsers = require('./showUsers.js');
const updateProfile = require('./updateProfile.js');
const changePassword = require('./changePassword.js');
const session = require('express-session');
var cookieParser = require("cookie-parser");
const { checkToken } = require("./jwt_validation");
const con = require('./db_connection.js');


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
      

    app.use('/signup', signup);
    app.use('/login', login);
    app.use('/deleteUser',deleteUser);
    app.use('/showUsers',showUsers);
    app.use('/updateProfile', updateProfile);
    app.use('/changePassword', changePassword);

    
app.get("/",sessionChecker,(req, res) => {
    console.log(req.session.user,'index_page');
    res.json({
        message: "Home Page...!!"
      });
   // res.redirect("/login");
   // res.send("Home page")
  });

    app.get("/dashboard",sessionChecker,checkToken, (req, res) => {
        console.log(req.session.user,'dashboard_page');
        console.log(token)
        if (req.session.user && req.cookies.user_sid) {
            res.json({
                message: "Welcome to Dashboard...!!"
              });
            //res.render('home');
        } else {
            
          //res.redirect("/login");
        }
      });
    
  



  app.get("/logout", (req, res) => {
// console.log(req.session.user,req.cookies.user_sid,'logout_page');

    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      //res.redirect("/");
      res.json({
        message: "Logged out...!!"
      });
    } else {
     // res.redirect("/login");
     res.json({
        message: "Error...!!"
      });
    }
  });
  
console.log('-------',process.env.JWT_KEY)
  
app.listen('8080');