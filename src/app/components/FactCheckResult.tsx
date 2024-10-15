"use client";

import React, { useEffect, useRef } from "react";

type Source = {
  name: string;
  link: string;
};

type FactCheckResultProps = {
  verdict: string;
  explanation: string;
  sources: Source[];
};

const FactCheckResult: React.FC<FactCheckResultProps> = ({
  verdict,
  explanation,
  sources,
}) => {
  const explanationRef = useRef<HTMLParagraphElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // To track and clear timeout

  // Typing effect
  function typeEffect(element: any, text: string, speed = 50) {
    let i = 0;
    if (element) {
      element.innerHTML = ""; // Clear content before starting
    }

    function typeWriter() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        // Clear any previous timeout before setting a new one
        timeoutRef.current = setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  }

  useEffect(() => {
    if (explanationRef.current) {
      typeEffect(explanationRef.current, explanation);
    }

    // Clean up the timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [explanation]); // Only re-run when the explanation changes

  return (
    <div>
      <h2 className="flash">
        Verdict: {verdict === "true" ? "True ✔️" : "False ✘"}
      </h2>
      <p ref={explanationRef}>{/* This will be typed out via the effect */}</p>

      <h3>Sources:</h3>
      <ul>
        {sources.length > 0 ? (
          sources.map((source, index) => (
            <li key={index}>
              <a href={source.link} target="_blank" rel="noopener noreferrer">
                {source.name}
              </a>
            </li>
          ))
        ) : (
          <li>No sources provided.</li>
        )}
      </ul>
    </div>
  );
};

export default FactCheckResult;
