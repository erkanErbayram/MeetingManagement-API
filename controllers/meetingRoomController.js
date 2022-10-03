const MeetingRoom = require("../models/MeetingRoomModel");
const User = require("../models/UserModel");
const AllMeetingRoom = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.user.id });
    const meetingRoom = await MeetingRoom.find({
      companies: user.companies,
    });
    res.json(meetingRoom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const AddMeetingRoom = async (req, res) => {
  const { meetingRoomName, wifi, projector, whiteboard, phone } = req.body;

  try {
    let user = await User.findById({ _id: req.user.id });
    let meetingRoom = await MeetingRoom.findOne({ meetingRoomName });
    if (meetingRoom) {
      return res.status(400).json({ msg: "Toplantı Salonu zaten kayitli" });
    }
    meetingRoom = new MeetingRoom({
      meetingRoomName,
      wifi,
      projector,
      whiteboard,
      phone,
      companies: user.companies,
    });
    await meetingRoom.save();
    res.json(meetingRoom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const UpdateMeetingRoom = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.user.id });
    let meetingRoom = await MeetingRoom.findByIdAndUpdate(
      req.param.id,
      {
        $set: {
          meetingRoomName,
          wifi,
          projector,
          whiteboard,
          phone,
          companies: user.companies,
        },
      },
      { new: true }
    );
    return res.status(200).json(meetingRoom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const DeleteMeetingRoom = async (req, res) => {
  try {
    const meetingRoom = await MeetingRoom.findByIdAndDelete(
      req.params.id
    );

    if (meetingRoom) {
      res.status(200).json("Kayıt Silindi");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
module.exports = {
  AllMeetingRoom,
  AddMeetingRoom,
  UpdateMeetingRoom, 
  DeleteMeetingRoom,
};
