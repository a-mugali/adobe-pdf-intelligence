import React from "react";

const PersonaInsights = ({ persona, job, headings, summary }) => {
  const sections = headings.filter((h) => h.level === 1);
  const subSections = headings.filter((h) => h.level === 2 || h.level === 3);

  return (
    <div className="insights-section">
      <h2>🧠 Persona-Based Insights</h2>

      <div style={{ marginBottom: "16px" }}>
        <p><strong>Persona:</strong> {persona || "N/A"}</p>
        <p><strong>Job:</strong> {job || "N/A"}</p>
      </div>

      {summary && (
        <div style={{ marginBottom: "20px" }}>
          <h4>📌 Summary:</h4>
          <ul>
            {summary.split("\n").map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <h4>📂 Sections:</h4>
        {sections.length ? (
          <ul>
            {sections.map((item, idx) => (
              <li key={idx}>{item.text}</li>
            ))}
          </ul>
        ) : (
          <p>No sections found.</p>
        )}
      </div>

      <div>
        <h4>📑 Subsections:</h4>
        {subSections.length ? (
          <ul>
            {subSections.map((item, idx) => (
              <li key={idx}>{item.text}</li>
            ))}
          </ul>
        ) : (
          <p>No subsections found.</p>
        )}
      </div>
    </div>
  );
};

export default PersonaInsights;
