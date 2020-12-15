const router = require("express").Router();
const bcrypt = require("bcrypt");

let UserModel = require("../Model/UserModel");
let ProductModel = require("../Model/ProductModel");

// get all user
router.route("/getalluser").get((req, res) => {
  UserModel.find()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

//create user or sign up
router.route("/create").post((req, res) => {
  let user = new UserModel({
    uid: req.body.uid,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 10),
    date_joined: Math.floor(Date.now() / 1000),
    phone: req.body.phone,
  });

  user
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

//login user
router.route("/login").post((req, res) => {
  UserModel.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(200).send({ message: err });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json(user);
      } else {
        res.status(200).send({ message: "username or password is incorrect!" });
      }
    }
  });
});

//update user

//update password by id

//update password by email

router.route("/resetpasswordbyemail").post((req, res) => {
  let email = req.body.email;
  UserModel.findOneAndUpdate(
    { email: email },
    { password: bcrypt.hashSync(req.body.password, 10) }
  ).then(() => {
    res.status(200).send({ message: "success" });
  });
});

// update password by phone number
router.route("/resetpasswordbyphone").post((req, res) => {
  let phone = req.body.phone;
  UserModel.findOneAndUpdate(
    { phone: phone },
    { password: bcrypt.hashSync(req.body.password, 10) }
  ).then(() => {
    res.status(200).send({ message: "success" });
  });
});

//update cart
router.route("/addtocart/:id-:pid").get((req, res) => {
  ProductModel.findById({ _id: req.params.pid })
    .then((product) => {
      UserModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { cart: product } }
      )
        .then(() => {
          res.status(200).send({ message: "success" });
        })
        .catch((err) => {
          res.status(400).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

//update wishlist
router.route("/addtowishlist/:id-:pid").get((req, res) => {
  ProductModel.findById({ pid: req.params.pid })
    .then((product) => {
      UserModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { wishlist: product } }
      )
        .then(() => {
          res.status(200).send({ message: "success" });
        })
        .catch((err) => {
          res.status(400).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

//update orders

router.route("/addtoorder/:id-:uid").get((req, res) => {
  ProductModel.findById({ pid: req.params.id })
    .then((product) => {
      UserModel.findByIdAndUpdate(
        { uid: req.params.uid },
        { $push: { orders: product } }
      )
        .then(() => {
          res.status(200).send({ message: "success" });
        })
        .catch((err) => {
          res.status(400).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

//delete user
router.route("/deleteuser:id").delete((req, res) => {
  UserModel.findOneAndRemove({ uid: req.params.id })
    .then(() => {
      res.status(200).send({ message: "success" });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

module.exports = router;
