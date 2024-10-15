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

  function typeEffect(element: HTMLElement, text: string, speed = 50) {
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    element.innerHTML = ""; // Clear any previous content
    typeWriter();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);

    const inputValue = (document.getElementById("input") as HTMLInputElement)
      .value;
    console.log(inputValue);
    // Validation function
    const validateInput = (input: string) => {
      // Check if input is a valid URL
      try {
        new URL(input);
        return true; // Valid URL
      } catch {}

      // Check if input has three or more words
      const words = input.trim().split(/\s+/);
      if (words.length >= 3) {
        return true;
      }

      return false; // Invalid input
    };

    // Perform validation
    if (!validateInput(inputValue)) {
      setError(null);
      // Use typing effect to display error message
      const formErrorElement = document.querySelector(
        ".form-error"
      ) as HTMLElement;
      if (formErrorElement) {
        typeEffect(
          formErrorElement,
          "Input needs to be three or more words or a valid URL."
        );
      }
      setError("Input needs to be three or more words or a valid URL.");
      setLoading(false);
      return;
    }

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

        <button
          className={loading ? "hidden" : "styled-button"}
          type="submit"
          disabled={loading}
        >
          Check
        </button>

        <div className={loading ? "monitor visible" : "monitor hidden"}>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 500 200"
            xmlSpace="preserve"
          >
            <g>
              <polyline
                className="ekg"
                points="486.6,113.8 328.2,113.8 310.3,132.3 296,70.7 246.8,127.4 241.6,120.2 233.9,166.4 227,27.6 
              213.2,118.3 211.8,112.3 205.1,126.1 198.2,108.5 194.1,124.4 184.5,92.9 174.1,113 4.3,113"
              />
            </g>
          </svg>
        </div>
      </form>

      {/* Display the result using the new FactCheckResult component */}
      {result && (
        <FactCheckResult
          verdict={result.verdict}
          explanation={result.explanation}
          sources={result.sources}
        />
      )}

      <p className={`form-error ${error ? "" : "hidden"}`}></p>
    </div>
  );
};

export default InputForm;
