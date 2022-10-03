const express = require("express");
const router = express.Router();
const ToplantiKaydi = require("../models/MeetingModel");
const auth = require("../middleware/auth");

const MeetingController = require("../controllers/meetingController");

router.get("/", auth, MeetingController.AllMeeting);
router.get("/report", auth, MeetingController.MeetingReport);
router.get("/:id", auth, MeetingController.MeetingDetail);
router.post("/", auth, MeetingController.MeetingAdd);
router.put("/note/:id", auth, MeetingController.MeetingNote);

router.post("/update/", auth, MeetingController.MeetingUpdate);

router.post("/delete", auth, MeetingController.MeetingDelete);
module.exports = router;
