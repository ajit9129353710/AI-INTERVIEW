import { Link } from "react-router-dom";
import {
History,
Clock,
Trophy,
MessageSquare,
ArrowRight,
BrainCircuit,
} from "lucide-react";

function InterviewHistory({ interviews = [], loading = false }) {
const formatDate = (date) => {
if (!date) return "Date unavailable";

return new Date(date).toLocaleString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

};

if (loading) {
return (
<section className="interview-history-card">
<div className="interview-history-heading">
<History size={22} />
<h2>Interview History</h2>
</div>

    <p>Loading your interview history...</p>
  </section>
);

}

return (
<section className="interview-history-card">
<div className="interview-history-heading">
<div className="feature-icon">
<History size={23} />
</div>

    <div>
      <h2>Interview History</h2>
      <p>Review your previous interview sessions.</p>
    </div>

    <Link to="/history" className="history-view-all">
      View All <ArrowRight size={16} />
    </Link>
  </div>

  {interviews.length === 0 ? (
    <div className="interview-history-empty">
      <BrainCircuit size={36} />

      <h3>No Interviews Yet</h3>

      <p>
        Complete your first AI mock interview to see your
        results here.
      </p>

      <Link to="/interview" className="button button-primary">
        Start Interview
      </Link>
    </div>
  ) : (
    <div className="interview-history-list">
      {interviews.map((interview) => (
        <article
          className="interview-history-item"
          key={interview._id}
        >
          <div className="interview-history-item-icon">
            <MessageSquare size={21} />
          </div>

          <div className="interview-history-item-content">
            <h3>{interview.role || "Interview Practice"}</h3>

            <p>
              <Clock
                size={14}
                style={{
                  verticalAlign: "middle",
                  marginRight: "5px",
                }}
              />
              {formatDate(interview.createdAt)}
            </p>

            <span>
              {(interview.questions || []).length} questions
            </span>
          </div>

          <div className="interview-history-item-score">
            <Trophy size={17} />

            <strong>{interview.totalScore ?? 0}</strong>
            <span>/ 10</span>
          </div>
        </article>
      ))}
    </div>
  )}
</section>

);
}

export default InterviewHistory;