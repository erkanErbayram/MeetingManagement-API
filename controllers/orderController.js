var fcm = require("fcm-notification");
var FCM = new fcm("./serviceAccountKey.json");
var TopicName = "all";

const Order = require("../models/OrderModel");
const auth = require("../middleware/auth");
const User = require("../models/UserModel");


const AllOrder = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user.id });
        const order = await Order.find({
          user: user._id,
        })
          .sort({ orderDate: -1 })
          .populate("user", ["nameSurname", "email"])
          .populate({
            path: "product",
            populate: { path: "products", select: "productName" },
          });
    
        if (!order) {
          return res.json("Sipariş Kaydı Bulunamadı.");
        }
        res.status(200).json(order);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
}
const AddOrder = async (req, res) => {
   try {
    const { product, meetingRoomName } = req.body;
    let user = await User.findOne({ _id: req.user.id });
    let meeting = await User.findOne({ _id: meetingRoomName });
  
    const order = new Order({
      companies: user.companies,
      product,
      meetingRoomName: meeting.meetingRoomName,
      user: user.id,
    });
    await order.save();
    var message = {
      data: {
        body: "body",
        title: "title",
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        id: "1",
        status: "done",
        image: "https://ibin.co/2t1lLdpfS06F.png",
      },
      notification: {
        title: "Sipariş Alındı",
        body: meeting.meetingRoomName + " Salonuna " + "Siparişiniz var",
      },
      topic: TopicName,
    };
    console.log(message);
  
    FCM.send(message, function (err, response) {
      if (err) {
        console.log("error found", err);
      } else {
        console.log("response here", response);
      }
    });
  
    res.json(order);
   } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
   }
}
const OrderReport = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user.id });
        const order = await Order.find({
          companies: user.companies,
          user: req.user.id,
        })
          .sort({ orderDate: -1 })
          .populate("user", ["nameSurname", "email"])
          .populate({
            path: "product",
            populate: { path: "products", select: "productName" },
          });
    
        if (!order) {
          return res.json("Sipariş Kaydı Bulunamadı.");
        }
        res.status(200).json(order);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
}
const OrderDelivered = async (req, res) => {
    try {
        let delivered = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              isDelivered: true,
            },
          },
          {
            new: true,
          }
        );
        res.json(delivered);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
}
module.exports = {
    AllOrder,
    AddOrder,
    OrderReport,
    OrderDelivered
  };
  