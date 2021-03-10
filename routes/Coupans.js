const router = require("express").Router();

const crypto = require("crypto");

let coupanModel = require("../Model/CoupanModel");

router.route("/create").get((req, res) => {
  let coupancode = crypto.randomBytes(8).toString("base64");

  let coupan = new coupanModel({
    coupanCode: coupancode,
  });

  coupan.save().then((cp) => {
    res.send({ message: "success", data: cp });
  });
});

module.exports = router;
