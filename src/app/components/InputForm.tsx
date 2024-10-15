"use client";

import React, { useState } from "react";
import FactCheckResult from "./FactCheckResult"; // Import the new component

const InputForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<{
    verdict: string;
    explanation: string;
    sources: [];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/fact-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputValue }),
      });

      const data = await response.json();

      if (response.ok && data.verdict && data.explanation) {
        // Make sure the expected fields are present
        setResult({
          verdict: data.verdict,
          explanation: data.explanation,
          sources: data.sources || [],
        });
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching the fact-check result:", error);
      setError("Error fetching the fact-check result.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            id="input"
            className="styled-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder=" " // Empty placeholder for styling
            required
          />
          <label htmlFor="input" className="floating-label">
            Enter a question, statement or website
          </label>
        </div>

        <button className="styled-button" type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check"}
        </button>
      </form>

      {/* Display the result using the new FactCheckResult component */}
      {result && (
        <FactCheckResult
          verdict={result.verdict}
          explanation={result.explanation}
          sources={result.sources}
        />
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default InputForm;
