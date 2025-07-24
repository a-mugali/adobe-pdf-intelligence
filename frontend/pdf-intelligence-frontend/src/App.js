import React, { useState } from "react";
import PdfViewer from "./components/PdfViewer";
import PersonaInsights from "./components/PersonaInsights";
import "./App.css"; // Create this CSS for custom styles

function App() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showViewer, setShowViewer] = useState(false);

  const [headings, setHeadings] = useState([]);
  const [summary, setSummary] = useState("");
  const [persona, setPersona] = useState("");
  const [job, setJob] = useState("");

  const handleLoadClick = async () => {
    setShowViewer(true);
    try {
      const outlineRes = await fetch("http://localhost:5000/sample.json");
      const outlineJson = await outlineRes.json();
      const formattedHeadings = outlineJson.outline.map(item => ({
        text: item.text,
        level: parseInt(item.level.replace("H", ""))
      }));
      setHeadings(formattedHeadings);

      const personaRes = await fetch("http://localhost:5000/persona_output.json");
      const personaJson = await personaRes.json();
      const meta = personaJson.metadata || {};
      setPersona(meta.persona || "N/A");
      setJob(meta.job || "N/A");

      const sections = personaJson.sections || [];
      const formattedSummary = sections
        .slice(0, 5)
        .map((sec, idx) => `${idx + 1}. [${sec.document} - Page ${sec.page}]: ${sec.section_title}`)
        .join("\n");

      setSummary(formattedSummary);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📄 Adobe Hackathon PDF Intelligence</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Paste PDF URL here..."
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
          />
          <button onClick={handleLoadClick}>🚀 Load PDF + Insights</button>
        </div>
      </header>

      <main className="content">
        <section className="pdf-section">
          {showViewer && <PdfViewer fileUrl={pdfUrl} />}
        </section>
        <section className="insights-section">
          {showViewer && (
            <PersonaInsights
              persona={persona}
              job={job}
              summary={summary}
              headings={headings}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
