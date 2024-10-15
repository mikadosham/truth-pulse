import React from "react";
import InputForm from "./components/InputForm";

export default function Home() {
  return (
    <main>
      <h1 className="pulse">TRUTH PULSE 3000</h1>
      <div className="logo">
        <div className="intro-block">
          <InputForm />
        </div>
      </div>
    </main>
  );
}
