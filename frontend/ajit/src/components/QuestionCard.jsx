import { useState } from "react";
import {
BrainCircuit,
Copy,
Check,
MessageSquare,
Lightbulb,
} from "lucide-react";

function QuestionCard({
question,
questionNumber = 1,
totalQuestions = 5,
answer = "",
onAnswerChange,
onSubmit,
loading = false,
}) {
const [copied, setCopied] = useState(false);

const handleCopy = async () => {
if (!question) return;

try {
  await navigator.clipboard.writeText(question);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
} catch {
  setCopied(false);
}

};

return (
<section className="question-card">
<div className="question-card-header">
<div className="feature-icon">
<BrainCircuit size={24} />
</div>

    <div>
      <h2>AI Interview Question</h2>
      <p>
        Question {questionNumber} of {totalQuestions}
      </p>
    </div>

    <button
      type="button"
      className="button button-outline button-small"
      onClick={handleCopy}
      disabled={!question}
      title="Copy question"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copied" : "Copy"}
    </button>
  </div>

  <div className="question-progress">
    <div
      className="question-progress-fill"
      style={{
        width: `${Math.min(
          100,
          (questionNumber / Math.max(1, totalQuestions)) * 100
        )}%`,
      }}
    />
  </div>

  <div className="question-content">
    <span className="question-label">YOUR QUESTION</span>

    <h3>
      {question ||
        "Your AI-generated interview question will appear here."}
    </h3>
  </div>

  <div className="answer-section">
    <label htmlFor="interview-answer">
      <MessageSquare size={17} />
      Your Answer
    </label>

    <textarea
      id="interview-answer"
      value={answer}
      onChange={(event) => {
        if (onAnswerChange) {
          onAnswerChange(event.target.value);
        }
      }}
      placeholder="Type your answer here, or use the voice assistant..."
      rows={6}
      disabled={loading}
    />

    <div className="answer-tip">
      <Lightbulb size={17} />
      <span>
        Explain your answer clearly and include an example when possible.
      </span>
    </div>
  </div>

  <div className="question-card-footer">
    <span>
      {answer.trim().length} characters
    </span>

    <button
      type="button"
      className="button button-primary"
      onClick={onSubmit}
      disabled={loading || !question || !answer.trim()}
    >
      {loading ? "Evaluating Answer..." : "Submit Answer"}
    </button>
  </div>
</section>

);
}

export default QuestionCard;