const express = require('express');
const router = express.Router();

router.get("/logout", (req, res) => {
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
      module.exports = router;