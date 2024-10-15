"use client";

import React from "react";

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
  return (
    <div>
      <h2>Verdict: {verdict === "true" ? "True ✔️" : "False ✖️"}</h2>
      <p>{explanation}</p>
      {sources.length > 0 && <h3>Sources</h3>}
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
