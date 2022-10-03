const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingRoomSchema = new Schema({
  companies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies"
  },
  meetingRoomName: {
    type: String,
    required: true,
  },
  wifi: {
    type: Boolean,
    default: false
  },
  projector: {
    type: Boolean,
    default: false
  },
  whiteboard: {
    type: Boolean,
    default: false
  },
  phone: {
    type: Boolean,
    default: false
  },
});
module.exports = MeetingRoom = mongoose.model(
  "meetingRoom",
  MeetingRoomSchema
);
