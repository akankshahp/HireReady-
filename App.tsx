import { useState } from "react";
import { analyzeResume } from "./analyzer";
import type { AnalysisResult } from "./types";

export default function App() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function onAnalyze() {
    setError(null);
    setResult(null);
    if (!resume.trim() || !jd.trim()) {
      setError("Please provide both a resume and a job description.");
      return;
    }
    setLoading(true);
    try {
      const r = await analyzeResume(resume, jd);
      setResult(r);
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setResume(text);
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="logo">HR</div>
        <div>
          <h1>HireReady</h1>
          <p className="tag">AI resume analyzer — get hired faster.</p>
        </div>
      </header>

      <section className="grid">
        <div className="card">
          <div className="card-head">
            <h2>Your resume</h2>
            <label className="file">
              Upload .txt
              <input type="file" accept=".txt,.md" onChange={onFile} hidden />
            </label>
          </div>
          <textarea
            placeholder="Paste your resume here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>

        <div className="card">
          <div className="card-head">
            <h2>Job description</h2>
          </div>
          <textarea
            placeholder="Paste the target job description here..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
        </div>
      </section>

      <div className="actions">
        <button onClick={onAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze with AI"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {result && (
        <section className="results">
          <div className="score">
            <div className="ring" style={{ ["--v" as any]: result.score }}>
              <span>{result.score}</span>
              <small>/100</small>
            </div>
            <p>{result.summary}</p>
          </div>

          <div className="grid">
            <Block title="Strengths" items={result.strengths} tone="good" />
            <Block title="Gaps" items={result.gaps} tone="warn" />
            <Block title="Missing keywords" items={result.missingKeywords} tone="chip" />
            <Block title="Suggestions" items={result.suggestions} tone="info" />
          </div>
        </section>
      )}

      <footer>
        <span>Built with HireReady starter · React + Vite</span>
      </footer>
    </div>
  );
}

function Block({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "good" | "warn" | "info" | "chip";
}) {
  return (
    <div className={`card block ${tone}`}>
      <h3>{title}</h3>
      {tone === "chip" ? (
        <div className="chips">
          {items.map((i, k) => (
            <span key={k} className="chip">
              {i}
            </span>
          ))}
        </div>
      ) : (
        <ul>
          {items.map((i, k) => (
            <li key={k}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
