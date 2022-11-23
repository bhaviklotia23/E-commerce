const express = require("express");
const { isAuthenticUser, authorizeRoles } = require("../middleware/auth");
const {
  createProduct,
  getAllProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
  createProductReview
} = require("./product.controller");

const router = express.Router();

//Admin Routes  -------------------->>

//Post
router
  .route("/admin/product/new")
  .post(isAuthenticUser, authorizeRoles("admin"), createProduct);

//Put
router
  .route("/admin/product/:id")
  .put(isAuthenticUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticUser, authorizeRoles("admin"), deleteProduct);

//Global Routes -------------------->>

//Get
router.route("/allproducts").get(getAllProducts);
router.route("/product/:id").get(getProductDetail);

//Review Routes -------------------->>
router.route("/review").put(isAuthenticUser, createProductReview);


module.exports = router;
