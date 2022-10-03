const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/companyController");
const auth = require("../middleware/auth");

router.get("/", auth, CompanyController.AllCompanies);
router.post("/", auth, CompanyController.AddCompany);
router.put("/update/:id", auth, CompanyController.UpdateCompany);
module.exports = router;
