import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "./heroimg.png";

const quickSteps = [
  "Share the classes, clubs, and hobbies you enjoy.",
  "Let Pathfinder brainstorm playful careers and study tracks.",
  "Open your custom roadmap and pick one fun task to try this week.",
];

const nextIdeas = [
  "Weekly nudges that remind students to try bite-sized challenges.",
  "Save your favorite careers and compare them at a glance.",
  "Add tiny wins to a sticker board for extra motivation.",
];

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="home-hero">
      <div className="home-grid">
        <section className="card hero-card">
          <span className="tag">Pathfinder refreshed</span>
          <h1>Your friendly guide from curiosity to career confidence.</h1>
          <p>
            Pathfinder now wears brighter colors, uses simpler words, and keeps
            every click easy for ages 8 to 30. Pick an adventure, tell us what
            you enjoy, and we will sketch the next steps together.
          </p>
          <div className="button-row">
            <button
              className="primary-button"
              onClick={() => navigate("/careerfinder")}
            >
              Find My Career Match
            </button>
            <button
              className="secondary-button"
              onClick={() => navigate("/form")}
            >
              Build a Roadmap
            </button>
          </div>
          <ul className="checklist">
            {quickSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </section>
        <section className="hero-illustration">
          <img className="hero-image" src={heroImg} alt="Students exploring career paths" />
        </section>
      </div>

      <section className="card next-ideas-card">
        <h2>Next Ideas We Are Cooking Up</h2>
        <p className="muted">
          Each idea focuses on encouragement, clarity, and playful tracking so younger
          students stay motivated.
        </p>
        <ul className="checklist">
          {nextIdeas.map((idea, index) => (
            <li key={index}>{idea}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Homepage;
