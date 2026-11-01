import {
Trophy,
Target,
TrendingUp,
Award,
CheckCircle2,
} from "lucide-react";

function ScoreCard({
score = 0,
totalScore = 10,
title = "Interview Score",
description = "Your interview performance",
}) {
const maxScore = Math.max(1, Number(totalScore) || 10);

const numericScore = Math.min(
maxScore,
Math.max(0, Number(score) || 0)
);

const percentage = Math.round(
(numericScore / maxScore) * 100
);

const getPerformance = () => {
if (percentage >= 80) {
return {
label: "Excellent",
message: "Outstanding work! Keep it up.",
};
}

if (percentage >= 60) {
  return {
    label: "Good",
    message: "Good progress! Keep practicing.",
  };
}

if (percentage >= 40) {
  return {
    label: "Average",
    message: "You are improving. Focus on weak areas.",
  };
}

return {
  label: "Needs Improvement",
  message: "Practice regularly to build confidence.",
};

};

const performance = getPerformance();

return (
<section className="score-card">
<div className="score-card-header">
<div className="feature-icon">
<Trophy size={23} />
</div>

    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>

  <div className="score-card-main">
    <div
      className="score-circle"
      style={{
        "--score-progress": `${percentage}%`,
      }}
    >
      <div className="score-circle-inner">
        <strong>{numericScore}</strong>
        <span>out of {maxScore}</span>
      </div>
    </div>

    <div className="score-card-details">
      <div className="score-performance">
        <Award size={19} />
        <span>{performance.label}</span>
      </div>

      <p>{performance.message}</p>

      <div className="score-percentage">
        <TrendingUp size={17} />
        <strong>{percentage}%</strong>
        <span>performance</span>
      </div>
    </div>
  </div>

  <div className="score-progress-section">
    <div className="score-progress-label">
      <span>
        <Target size={16} />
        Progress
      </span>

      <strong>{percentage}%</strong>
    </div>

    <div className="score-progress-track">
      <div
        className="score-progress-fill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>

  <div className="score-card-footer">
    <CheckCircle2 size={17} />

    <span>
      {percentage >= 60
        ? "Keep building on your strengths."
        : "Review your feedback and practice again."}
    </span>
  </div>
</section>

);
}

export default ScoreCard;