import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import testData from "./testData";

function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();
  const aiResponse = location.state?.aiResponse;
  const roadmapData = aiResponse?.years ? aiResponse : testData;
  const usingSample = !aiResponse?.years;

  if (!roadmapData) {
    return (
      <div className="page-shell">
        <button className="back-button" onClick={() => navigate("/")}>
          <- Home
        </button>
        <section className="card">
          <h2>We need a roadmap first.</h2>
          <p className="helper-text">
            Tell us about your goals on the form page so we can draw the steps.
          </p>
          <button className="primary-button" onClick={() => navigate("/form")}>
            Go to Roadmap Form
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <button className="back-button" onClick={() => navigate("/")}>
        <- Home
      </button>

      <section className="card">
        <span className="tag">
          {usingSample ? "Sample Journey" : "Custom Journey"}
        </span>
        <h1>{roadmapData.track}</h1>
        <p className="helper-text">
          {usingSample
            ? "This is a practice roadmap. Fill out the form to unlock your personalized plan."
            : "Celebrate how far you have come, then pick one action from each year to start now."}
        </p>
        <div className="button-row">
          <button className="primary-button" onClick={() => navigate("/form")}>
            Update My Answers
          </button>
          <button
            className="secondary-button"
            onClick={() => navigate("/careerfinder")}
          >
            Explore Careers
          </button>
        </div>
        {usingSample && (
          <div className="info-banner">
            You're viewing Pathfinder's demo data right now. Submit the roadmap form to see a custom plan.
          </div>
        )}
      </section>

      <div className="roadmap-grid">
        {roadmapData.years?.map((yearData, yearIndex) => (
          <article key={yearIndex} className="year-card">
            <h3>{yearData.year}</h3>
            {yearData.categories.map((category, catIndex) => (
              <div key={catIndex} className="category-card">
                <h4>{category.categoryName}</h4>
                <p>{category.categoryDescription}</p>
              </div>
            ))}
          </article>
        ))}
      </div>

      <section className="card next-ideas-card">
        <h3>Keep the momentum</h3>
        <ul className="checklist">
          <li>Share this roadmap with a teacher, mentor, or family member.</li>
          <li>Highlight one challenge from each year and start on the easiest one.</li>
          <li>Use the Career Finder to compare new industries whenever your interests grow.</li>
        </ul>
      </section>
    </div>
  );
}

export default Roadmap;
