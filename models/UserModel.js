const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  companies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  nameSurname: {
    type: String,
  },
  userName: {
    type: String,
  },
  meetingRoomName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isMeetingRoom: {
    type: Boolean,
    default: false,
  },
  isEmployee:{
    type: Boolean,
    default: false,
  },
  meetingRoomFeatures: [
    {
      wifi: {
        type: Boolean,
        default: false,
      },
      projector: {
        type: Boolean,
        default: false,
      },
      whiteboard: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
    },
  ],
});
module.exports = User = mongoose.model("user", UserSchema);
