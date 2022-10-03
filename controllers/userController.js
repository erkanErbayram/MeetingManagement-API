const Urun = require("../models/Urun");
const User = require("../models/UserModel");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "*",
    pass: "*",
  },
});
const AllUsers = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const meeting = await User.find({
      companies: user.companies,
    }).select("-password");
    if (!meeting) {
      return res.json("Toplantı Salonu Bulunamadı.");
    }
    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json({ msg: "Server Hatası" });
    console.error(err);
  }
};
const Register = async (req, res) => {
  const {
    nameSurname,
    email,
    isAdmin,
    isMeetingRoom,
    meetingRoomName,
    userName,
    password,
    meetingRoomFeatures,
    isEmployee,
  } = req.body;
  const random = uuidv4().substring(0, 8);
  console.log("====================================");
  console.log(random);
  console.log("====================================");
  try {
    let userId = await User.findOne({ _id: req.user.id });

    if (email != null) {
      if (email.includes("@")) {
        user = await User.findOne({ email });
      }
    } else {
      user = await User.findOne({ userName });
    }

    if (user)
      return res.status(400).json({ errors: "Bu hesap zaten kayitli" });

    user = new User({
      userName,
      nameSurname: email != null ? nameSurname : isEmployee ? nameSurname : null,
      email,
      meetingRoomName: email != null ? null : meetingRoomName,
      password: email != null ? random : password,
      isAdmin,
      isMeetingRoom: email != null ? false : isEmployee ? false : true,
      firmalar: userId.firmalar,
      meetingRoomFeatures: email != null ? null : meetingRoomFeatures,
      isEmployee,
    });

    const salt = await bcrypt.genSalt(10);
    if (email != null) {
      user.password = await bcrypt.hash(random, salt);
    } else {
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json(user);
    if (email != null) {
      var mailOptions = {
        from: `"Toplanti Uygulamasi" <mail>`,
        to: email,
        subject: "Toplantı Salon Yonetimi",
        text: `Şifreniz : ${random}`,
        html: `Şifreniz : ${random}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu ile bağlantı sağlanamadı");
  }
};
const Login = async (req, res) => {
  const { password, email, userName } = req.body;
  try {
    if (email != null) {
      if (email.includes("@")) {
        user = await User.findOne({ email });
      }
    } else {
      user = await User.findOne({ userName });
    }
    if (!user) {
      return res.status(400).json({ errors: "E-Mail veya parola yanlış" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: "E-Mail veya parola yanlış" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Sunucu ile bağlantı sağlanamadı" });
  }
};

const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ errors: "Bu mail ile kayitli kullanici bulunamadi" });
  }

  const random = uuidv4().substring(0, 8);
  console.log(random);

  const salt = await bcrypt.genSalt(10);
  let kripto = await bcrypt.hash(random, salt);
  let kul = await User.findByIdAndUpdate(
    { _id: user._id },
    {
      $set: {
        password: kripto,
      },
    },
    { new: true }
  );
  console.log("====================================");
  console.log(random);
  console.log("====================================");

  var mailOptions = {
    from: `"Toplanti Uygulamasi" <mail>`,
    to: email,
    subject: "Toplantı Salon Yonetimi",
    text: `Şifreniz : ${random}`,
    html: `Şifreniz : ${random}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res.json({ msg: "Success" });
};
const ChangePassword = async (req, res) => {
  try {
    const { password, password1 } = req.body;

    let user = await User.findOne({ _id: req.user.id });

    const sifre = await bcrypt.compare(password, user.password);

    if (!sifre) {
      return res.status(400).json({ msg: "Parola Yanlış" });
    }

    const salt = await bcrypt.genSalt(10);
    let kripto = await bcrypt.hash(password1, salt);

    await User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          password: kripto,
        },
      },
      { new: true }
    );

    res.status(200).json({ msg: "Success" });
  } catch (err) {
    res.status(500).send("Sunucu ile bağlantı sağlanamadı");
  }
};
const Me = async (req, res) => {
  try {
    const me = await User.findById(req.user.id).select("-password");
    res.json(me);
  } catch (error) {
    console.error(err.message);
  }
};
module.exports = {
    AllUsers,
    Register,
    Login,
    ForgotPassword,
    ChangePassword,
    Me,
};
