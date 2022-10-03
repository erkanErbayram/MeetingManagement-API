const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  companies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  meetingRoom: {
    type: Schema.Types.ObjectId,
    ref: "meetingRoom",
  },
  email: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  startingDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  attendees: [
    {
      nameSurname: {
        type: String,
        /*  required: true, */
      },
      email: {
        type: String,
        /*  required: true, */
      },
    },
  ],
  notes: {
    type:Array
  }
});
module.exports = Meeting = mongoose.model(
  "meeting",
  MeetingSchema
);
