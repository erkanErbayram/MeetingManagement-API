const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  }
});
module.exports = Companies = mongoose.model("companies", CompanySchema);
