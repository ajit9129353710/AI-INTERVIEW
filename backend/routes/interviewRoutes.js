const express = require("express");
const router = express.Router();

const {
generateQuestion,
evaluateAnswer,
getInterviewHistory,
} = require("../controllers/interviewController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/question", authMiddleware, generateQuestion);
router.post("/evaluate", authMiddleware, evaluateAnswer);
router.get("/history", authMiddleware, getInterviewHistory);

module.exports = router;