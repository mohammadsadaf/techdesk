import { useState } from "react";
import "./App.css";

function App() {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeProblem = async () => {
    if (!problem.trim()) {
      alert("Please describe your IT problem.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      if (data.result) {
        setResult(data.result);
      } else {
        setResult(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setResult(null);
      alert("TechDesk is unable to analyze this issue right now. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>TechDesk</h1>

        <p>AI-Powered IT Support Assistant</p>

        <h3>What's going wrong?</h3>

        <textarea
          placeholder="Describe your IT problem here..."
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
        <div className="quick-issues">
  <span>Quick examples:</span>

  <button
    className="quick-button"
    onClick={() =>
      setProblem("My laptop is connected to Wi-Fi but websites will not load.")
    }
  >
    Wi-Fi
  </button>

  <button
    className="quick-button"
    onClick={() =>
      setProblem("I forgot my Windows password and cannot log in.")
    }
  >
    Login
  </button>

  <button
    className="quick-button"
    onClick={() =>
      setProblem("My office printer says offline and I cannot print.")
    }
  >
    Printer
  </button>
</div>

        <button onClick={analyzeProblem}>
          {loading ? "Analyzing..." : "Analyze Problem"}
        </button>
        <button
  className="clear-button"
  onClick={() => {
    setProblem("");
    setResult("");
  }}
>
  Clear
</button>

        {result && (
  <div className="result">
    <h2>TechDesk Analysis</h2>

    <div className="result-section">
      <h3>Category</h3>
      <p>{result.category}</p>
    </div>

    <div className="result-section">
      <h3>Priority</h3>
      <p>{result.priority}</p>
    </div>

    <div className="result-section">
      <h3>Possible Cause</h3>
      <p>{result.possibleCause}</p>
    </div>

    <div className="result-section">
      <h3>Troubleshooting Steps</h3>
      <ol>
        {result.troubleshootingSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>

    <div className="result-section">
      <h3>Suggested Response</h3>
      <p>{result.suggestedResponse}</p>
    </div>
  </div>
  )}
      </div>
      <footer className="footer">
        © 2026 Sadaf Mohammad · TechDesk
      </footer>
    </div>
    
  );
}

export default App;