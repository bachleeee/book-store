const express = require("express");
const {
  findAll,
  createProduct,
  findOne,
  update,
  deleteProduct,
  deleteAllProducts,
  findOneBySlug,
  findByCat
} = require("../controllers/products.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllProducts)
router.route("/").post(createProduct)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteProduct);

router.route('/:slug').get(findOneBySlug)

module.exports = router;