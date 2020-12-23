const router = require("express").Router();

let productModel = require("../Model/ProductModel");

//get products by category
router.route("/searchByCategory/:cat").get((req, res) => {
  let p = req.params.cat;
  productModel
    .find(
      { category: { $in: [p] } },
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
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(404).send({ message: "no data found" });
    });
});

//getall product
router.route("/getall").get((req, res) => {
  productModel
    .find(
      {},
      {
        title: 1,
        group: 1,
        category: 1,
        description: 1,
        color: 1,
        thumbnailURL: 1,
        offer_price: 1,
        sell_price: 1,
        featured: 1,
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

// create product
router.route("/add").post((req, res) => {
  console.log(req.body);
  let product = new productModel({
    pid: req.body.pid,
    title: req.body.title,
    offer_price: req.body.offer_price,
    sell_price: req.body.sell_price,
    category: req.body.category,
    description: req.body.description,
    tags: req.body.tags,
    color: req.body.color,
    thumbnailURL: req.body.thumbnailURL,
    imageURL: req.body.imageURL,
    group: req.body.group,
    quantity: req.body.quantity,
    details: req.body.details,
    rating: req.body.rating,
    seller: req.body.seller,
  });

  product
    .save()
    .then(() => {
      res.status(200);
      res.send("product added successfully");
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
      res.send({ mesage: err });
    });
});

//update product

router.route("/update/:pid").post((req, res) => {
  let pid = req.params.pid;

  productModel
    .findByIdAndUpdate(
      { _id: pid },
      {
        pid: req.body.pid,
        title: req.body.title,
        offer_price: req.body.offer_price,
        sell_price: req.body.sell_price,
        category: req.body.category,
        description: req.body.description,
        tags: req.body.tags,
        color: req.body.color,
        thumbnailURL: req.body.thumbnailURL,
        imageURL: req.body.imageURL,
        group: req.body.group,
        quantity: req.body.quantity,
        details: req.body.details,
        rating: req.body.rating,
        featured: req.body.featured,
      }
    )
    .then((result) => {
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      res.status(404).send({ success: false, error: err });
    });
});

// add reviews
router.route("/addreview:pid").post((req, res) => {
  let pid = req.params.pid;
  let review = {
    user: req.body.user,
    review: req.body.review,
  };

  productModel
    .findOneAndUpdate({ _id: pid }, { $push: { reviews: review } })
    .then(() => {
      res.status(200).send({ message: "success" });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

//read product

router.route("/getproduct/:pid").get((req, res) => {
  let pid = req.params.pid;
  console.log(pid);
  productModel
    .findOne({ _id: pid })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

//delete product
router.route("/deleteproduct:pid").delete((req, res) => {
  let pid = req.query.pid;

  productModel
    .findByIdAndRemove({ _id: pid })
    .then(() => {
      res.status(200).send({ message: "deleted successfully" });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

module.exports = router;
