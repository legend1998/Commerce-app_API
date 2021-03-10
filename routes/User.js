const router = require("express").Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

let UserModel = require("../Model/UserModel");
let ProductModel = require("../Model/ProductModel");
let AddressModel = require("../Model/AddressModel");
let CoupanModel = require("../Model/CoupanModel");
const User = require("../Model/UserModel");

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
router.route("/create").post(async (req, res) => {
  let refcode = crypto.randomBytes(16).toString("base64");

  let user = await UserModel.create({
    fname: req.body.fname,
    lname: req.body.lname,
    refCode: refcode,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  })
    .then((doc) => doc)
    .catch((e) => false);
  if (!user) return res.status(400).send({ message: "can't create user" });
  let coupan = await CoupanModel.create({
    coupanCode: crypto.randomBytes(8).toString("base64"),
  }).catch((e) => false);
  UserModel.findOneAndUpdate({ _id: user._id }, { $push: { coupans: coupan } })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((e) => {
      res.status(400).send({ message: "something went wrong" });
    });
});

//login user
router.route("/login").post((req, res) => {
  var user = req.body.email;
  if (user.endsWith("@gmail.com")) {
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        if (user == null) {
          res.status(200).send({ message: "user not registered" });
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).json(user);
        } else {
          res
            .status(200)
            .send({ message: "username or password is incorrect!" });
        }
      })
      .catch((err) => {
        res.status(200).send({ message: err });
      });
  } else {
    UserModel.findOne({ phone: req.body.email })
      .then((user) => {
        if (user == null) {
          res.status(200).send({ message: "user not registered" });
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).json(user);
        } else {
          res
            .status(200)
            .send({ message: "username or password is incorrect!" });
        }
      })
      .catch((err) => {
        res.status(200).send({ message: "" });
      });
  }
});

// add address
router.route("/address").post((req, res) => {
  let address = new AddressModel({
    street: req.body.street,
    house: req.body.house,
    Landmark: req.body.landmark,
    district: req.body.district,
    state: req.body.state,
    pin_code: req.body.state,
  });
  UserModel.findOneAndUpdate(
    { _id: req.body.uid },
    { $push: { address: address } }
  )
    .then((result) => {
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      res.status(404).send({ err: err });
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
  ProductModel.findById(
    { _id: req.params.pid },
    {
      title: 1,
      group: 1,
      category: 1,
      description: 1,
      color: 1,
      offer_price: 1,
      sell_price: 1,
    }
  )
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
  ProductModel.findById(
    { pid: req.params.pid },
    {
      title: 1,
      group: 1,
      category: 1,
      description: 1,
      color: 1,
      offer_price: 1,
      sell_price: 1,
    }
  )
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
  ProductModel.findById(
    { pid: req.params.id },
    {
      title: 1,
      group: 1,
      category: 1,
      description: 1,
      color: 1,
      offer_price: 1,
      sell_price: 1,
    }
  )
    .then((product) => {
      UserModel.findByIdAndUpdate(
        { _id: req.params.uid },
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
  UserModel.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.status(200).send({ message: "success" });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

//add refcode
router.route("/addrefcode").post(async (req, res) => {
  let exist = await UserModel.exists({ refCode: req.body.refcode });
  if (!exist) return res.status(200).send({ message: "invalid referal code" });
  let user = await UserModel.findOne({ _id: req.body.uid });

  if (user.refBy != "")
    return res
      .status(200)
      .send({ message: `already referred by ${user.refBy}` });

  let coupan = await CoupanModel.create({
    coupanCode: crypto.randomBytes(8).toString("base64"),
  });

  await UserModel.findOneAndUpdate(
    { refCode: req.body.refcode },
    { $push: { coupans: coupan } }
  );
  UserModel.findOneAndUpdate({ _id: req.body.uid }, { refBy: req.body.refcode })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res
        .status(402)
        .send({ message: "something went wrong try again after some time" });
    });
});

module.exports = router;
