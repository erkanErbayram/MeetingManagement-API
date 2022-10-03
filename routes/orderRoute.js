const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const auth = require("../middleware/auth");


router.get("/", [auth], OrderController.AllOrder);
router.get("/report", [auth], OrderController.OrderReport);
router.post("/", auth, OrderController.AddOrder);
router.put("/delivered/:id", [auth], OrderController.OrderDelivered);

module.exports = router;
