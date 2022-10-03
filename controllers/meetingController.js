const Meeting = require("../models/MeetingModel");
const User = require("../models/UserModel");
const AllMeeting = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    const meeting = await Meeting.find({
      companies: user.companies,
      meetingRoom: req.user.id,
    });

    if (!meeting) {
      return res.json("Toplantı Kaydı Bulunamadı.");
    }
    return res.status(200).json(meeting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const MeetingAdd = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    const {
      meetingRoom,
      companyName,
      email,
      title,
      subject,
      startingDate,
      endDate,
      attendees,
    } = req.body;

    const meeting =  new Meeting({
      meetingRoom,
      companyName,
      companies: user.companies,
      user: req.user.id,
      email,
      title,
      subject,
      startingDate: startingDate.substring(0, 23),
      endDate,
      attendees: attendees,
    });

    await meeting.save();
    res.json(meeting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const MeetingUpdate = async (req, res) => {
  try {
    let kullanici = await User.findById({ _id: req.user.id });
    const {
      meetingRoom,
      companyName,
      email,
      title,
      subject,
      startingDate,
      endDate,
      attendees,
      date,
    } = req.body;
    let eklenme = await Meeting.findOne({ date });
    let meeting = await Meeting.findOneAndUpdate(
      req.params.id,
      {
        $set: {
          meetingRoom,
          companyName,
          firmalar: kullanici.firmalar,
          kullanici: req.user.id,
          email,
          title,
          subject,
          startingDate,
          endDate,
          attendees: attendees,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json(meeting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const MeetingReport = async (req, res) => {
    try {
        let kullanici = await User.findOne({ _id: req.user.id });
        const meeting = await Meeting.find({
          firmalar: kullanici.firmalar,
          /*  meetingRoom: req.user.id, */
        });
    
        if (!meeting) {
          return res.json("Toplantı Kaydı Bulunamadı.");
        }
        return res.status(200).json(meeting);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
};
const MeetingDetail = async (req, res) => {
    try {
        const meeting = await Meeting.findById({
          _id: req.params.id,
        });
    
        if (!meeting) {
          return res.json("Toplantı Kaydı Bulunamadı.");
        }
        return res.status(200).json(meeting);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
};
const MeetingNote = async (req, res) => {
    try {
        const { notes } = req.body;
    
        let meeting = await Meeting.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              notes: notes,
            },
          },
          {
            new: true,
          }
        );
    
        res.json(meeting);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
};
const MeetingDelete = async (req, res) => {
    try {
        const meeting = await Meeting.findOneAndDelete(
          req.body.datetime.substring(0, 23)
        );
        if (meeting) {
          res.status(200).json({ msg: "Kayıt Silindi" });
        } else {
          res.status(400).json({ error: "Kayıt Silinemedi" });
        }
      } catch (err) {
        res.status(500).send("Server Error");
      }
};
module.exports = {
  AllMeeting,
  MeetingAdd,
  MeetingUpdate,
  MeetingReport,
  MeetingDetail,
  MeetingNote,
  MeetingDelete
};
