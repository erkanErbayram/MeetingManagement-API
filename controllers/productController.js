const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const AllProduct = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    const products = await Product.find({
      companies: user.companies,
    });

    if (!products) {
      return res.json("Urun Kaydı Bulunamadı.");
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const AddProduct = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    const { productName, productPrice, stock } = req.body;

    const product =  new Product({
      companies: user.companies,
      productName,
      productPrice,
      stock,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json({ msg: "Kayıt Silindi" });
    } else {
      res.status(400).json({ error: "Kayıt Silinemedi" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
module.exports = {
  AllProduct,
  AddProduct,
  DeleteProduct,
};
