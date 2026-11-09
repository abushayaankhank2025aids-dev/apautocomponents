"use client";

import { useEffect, useState } from "react";

export function CinematicIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    try {
      if (window.sessionStorage.getItem("ap-industrial-intro-seen") === "yes") return;
      window.sessionStorage.setItem("ap-industrial-intro-seen", "yes");
    } catch {
      return;
    }

    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <aside className="cinematic-intro" aria-label="A.P. Auto Components introduction">
      <div className="cinematic-intro__particles" aria-hidden="true" />
      <div className="cinematic-intro__content">
        <span className="cinematic-intro__eyebrow">AP INDUSTRIAL DIMENSION</span>
        <p>A.P. Auto Components</p>
        <span className="cinematic-intro__line" aria-hidden="true" />
      </div>
      <button className="cinematic-intro__skip" type="button" onClick={() => setVisible(false)}>
        Skip Intro
      </button>
    </aside>
  );
}
