import {
BrainCircuit,
Trophy,
CheckCircle2,
Lightbulb,
Target,
Copy,
Check,
} from "lucide-react";

import { useState } from "react";

function FeedbackCard({
feedback = "",
score = 0,
improvedAnswer = "",
nextSuggestion = "",
onNextQuestion,
}) {
const [copied, setCopied] = useState(false);

const handleCopy = async () => {
if (!improvedAnswer) return;

try {
  await navigator.clipboard.writeText(improvedAnswer);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
} catch {
  setCopied(false);
}

};

const safeScore = Math.min(10, Math.max(0, Number(score) || 0));

return (
<section className="feedback-card">
<div className="feedback-header">
<div className="feature-icon">
<BrainCircuit size={24} />
</div>

    <div>
      <h2>AI Answer Feedback</h2>
      <p>Review your performance and learn how to improve.</p>
    </div>
  </div>

  <div className="feedback-score-section">
    <div className="feedback-score-circle">
      <Trophy size={24} />

      <strong>{safeScore}</strong>

      <span>out of 10</span>
    </div>

    <div className="feedback-score-info">
      <h3>
        {safeScore >= 8
          ? "Excellent Answer!"
          : safeScore >= 6
          ? "Good Effort!"
          : safeScore >= 4
          ? "Keep Practicing!"
          : "Let's Improve!"}
      </h3>

      <p>
        {safeScore >= 8
          ? "Your answer shows strong understanding."
          : safeScore >= 6
          ? "You're on the right track. A few improvements can make your answer stronger."
          : "Review the feedback below and practice explaining your answer more clearly."}
      </p>
    </div>
  </div>

  <div className="feedback-detail">
    <div className="feedback-detail-title">
      <CheckCircle2 size={19} />
      <h3>AI Feedback</h3>
    </div>

    <p>
      {feedback ||
        "Your detailed feedback will appear here after evaluation."}
    </p>
  </div>

  <div className="feedback-detail improved-answer">
    <div className="feedback-detail-title">
      <Lightbulb size={19} />
      <h3>Improved Answer</h3>
    </div>

    <p>
      {improvedAnswer ||
        "An improved sample answer will appear here after evaluation."}
    </p>

    <button
      type="button"
      className="button button-outline button-small"
      onClick={handleCopy}
      disabled={!improvedAnswer}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copied" : "Copy Improved Answer"}
    </button>
  </div>

  <div className="feedback-detail next-suggestion">
    <div className="feedback-detail-title">
      <Target size={19} />
      <h3>Next Suggestion</h3>
    </div>

    <p>
      {nextSuggestion ||
        "Practice another question to improve your interview skills."}
    </p>
  </div>

  {onNextQuestion && (
    <button
      type="button"
      className="button button-primary"
      onClick={onNextQuestion}
    >
      Practice Next Question
    </button>
  )}
</section>

);
}

export default FeedbackCard;