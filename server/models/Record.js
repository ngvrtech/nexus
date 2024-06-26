const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  // date/time format "2011-10-10T14:48:00"
  propertyAddress: {
    type: String,
  },
  service: {
    type: String,
  },
  employee: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  submissionTime: {
    type: Date,
  },
  billableHours: {
    type: Number,
  },
  status: {
    type: String,
  },
  // In-Progress
  // Completed
  // Cancelled
  // Needs Attention
  checklistData: {
    type: Array,
  },
  // [{name: taskName, status: String, notes: String}]
  reportedIssues: {
    type: Array,
  },
  // [{type: missing/damaged, status: true/false, notes: String}]
  uploadedPhotos: {
    type: Array,
  },
  employeeComments: {
    type: String,
  },
  adminNotes: {
    type: String,
  },
});

module.exports = mongoose.model("Record", RecordSchema);
