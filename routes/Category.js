const router = require("express").Router();

let CategoryModel = require("../Model/CategoryModel");

router.route("/getcategory").get((req, res) => {
  CategoryModel.find({}, { category: 1, _id: 0 })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.route("/addcategory").post((req, res) => {
  let category = new CategoryModel({
    category: req.body.category,
  });
  category
    .save()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
module.exports = router;
