import React from "react";
import InputForm from "./components/InputForm";

export default function Home() {
  return (
    <main>
      <h1 className="pulse">TRUTH PULSE 5000</h1>
      <div className="logo">
        <div className="intro-block">
          <InputForm />
        </div>
      </div>
      <footer className="cmd-footer">
        <span>© 2024 TruthPulse. All rights reserved.</span> <br />
        <div className="tooltip">
          What is this?
          <span className="tooltiptext">
            TruthPulse is a fact-checking app that uses AI to verify statements
            or URLs, providing verdicts and reliable sources.
          </span>
        </div>
      </footer>
    </main>
  );
}
