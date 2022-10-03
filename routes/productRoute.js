const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ProductController = require("../controllers/productController")
router.get("/", [auth],ProductController.AllProduct );
router.post("/", [auth], ProductController.AddProduct);
router.delete("/delete/:id", auth, ProductController.DeleteProduct);
module.exports = router;
