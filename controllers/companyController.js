const Company = require("../models/CompanyModel");


const AllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
}
const AddCompany = async (req, res) => {
    const { companyName, address, phone } = req.body;
    try {
      let company = await Company.findOne({ companyName });
      if (company) {
        return res.status(400).json({ errors: [{ msg: "Bu Firma Zaten Kayıtlı" }] });
      }
      company = new Company({
        companyName,
        address,
        phone,
      });
     await company.save();
      res.status(200).json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
}
const UpdateCompany = async (req, res) => {
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { companyName, address, phone } = req.body;
      try {
        let company = await Company.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              companyName,
              address,
              phone,
            },
          },
          {
            new: true,
          }
        );
        if (!company) return res.status(404).json({ msg: "firma Bulunamadi" });
        return res.status(200).json(company);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
}
module.exports = {
    AllCompanies,
    AddCompany,
    UpdateCompany
  };
  