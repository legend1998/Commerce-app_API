let router = require("express").Router();

const { findOneAndUpdate } = require("../Model/OrdersModel");
let OrderModel = require("../Model/OrdersModel");

// make an order
router.route("/makeOrder").post((req, res) => {
  let order = new OrderModel({
    totalAmount: req.body.totalAmount,
    orderedby: req.body.userid,
    products: req.body.products,
    paymentStatus: req.body.status,
  });

  order
    .save()
    .then(() => {
      res.status(200).send({ message: "success" });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

// update order

router.route("/updateorder/:oid").post((req, res) => {
  OrderModel,
    findOneAndUpdate(
      { _id: req.params.oid },
      { fulfilled: req.body.fulfilled, paymentStatus: req.body.paymentStatus }
    )
      .status(200)
      .send({ success: true, message: "updated succcessfully" });
});

// get all orders

router.route("/getall").get((req, res) => {
  OrderModel.find()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(404).send({ success: false, message: err });
    });
});

module.exports = router;
