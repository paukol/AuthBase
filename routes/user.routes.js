const express = require("express");
const router = express.Router();

const isLogged = (req, res, next) => {
  if (req.user == undefined) {
    res.redirect("/user/no-permission");
    console.log(req.user);
  } else {
    next();
  }
};

router.get("/logged", isLogged, (req, res) => {
  console.log("user", req.user);
  res.render("logged", {
    name: req.user.displayName,
    avatar: req.user.photos[0].value,
  });
});
router.get("/profile", isLogged, (req, res) => {
  res.send("your profile");
});
router.get("/profile/settings", isLogged, (req, res) => {
  res.send("your profile settings");
});

router.get("/no-permission", (req, res) => {
  res.render("noPermission");
});

module.exports = router;