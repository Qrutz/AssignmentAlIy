const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  MeetingName: {
    type: String,
    required: true,
  },
  MeetingDate: {
    type: Date,
    required: true,
  },
  MeetingTime: {
    type: String,
  },
  MeetingLocation: {
    type: String,
    required: true
  },
  MeetingAgenda: {
    type: String,
    required: true,
  },
  //   MeetingAttendees: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User',
  //     },
  //   ],

  GroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssignmentGroup',
  },
});

module.exports = mongoose.model('Meeting', MeetingSchema);
