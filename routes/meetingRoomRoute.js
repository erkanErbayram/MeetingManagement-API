const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const MeetingRoomController= require("../controllers/meetingRoomController");
router.get("/", [auth], MeetingRoomController.AllMeetingRoom);
router.post("/", [auth], MeetingRoomController.AddMeetingRoom);
router.put("/update/:id", auth,MeetingRoomController.UpdateMeetingRoom );
router.delete("/delete/:id",auth,MeetingRoomController.DeleteMeetingRoom);
module.exports = router;
