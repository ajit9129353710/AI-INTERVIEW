const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},

role: {
  type: String,
  required: true,
},

questions: [
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    feedback: String,
    score: Number,
  },
],

totalScore: {
  type: Number,
  default: 0,
},

},
{ timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);