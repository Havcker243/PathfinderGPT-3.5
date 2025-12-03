import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const gpaRanges = [
  "4.0 - 5.0",
  "3.5 - 4.0",
  "3.0 - 3.5",
  "2.5 - 3.0",
  "2.0 - 2.5",
  "1.5 - 2.0",
  "1.0 - 1.5",
  "0.5 - 1.0",
  "0.0 - 0.5",
];

function Careerfinder() {
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    Activities: "",
    Subjects: "",
    Classes: "",
    Extracurriculars: "",
    Clubs: "",
    Certifications: "",
    Gpa: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/FindYourCareer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("The counselor bot needs another try.");
      }

      const responseData = await response.json();
      setAiResponse(responseData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "We could not reach the Pathfinder counselor. Please check your server and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <button className="back-button" onClick={() => navigate("/")}>
        <- Home
      </button>
      <div className="content-grid">
        <section className="card">
          <span className="tag">Career Finder</span>
          <h2>Tell us about the things that make you curious.</h2>
          <p className="helper-text">
            Use playful language. The more you share about your favorite
            activities and classes, the better Pathfinder can match you with
            kid-friendly careers.
          </p>
          <ul className="checklist">
            <li>Clubs and community groups</li>
            <li>Weekend projects or hobbies</li>
            <li>Dream jobs you talk about with friends</li>
          </ul>
        </section>

        <form className="card form-card" onSubmit={handleSubmit}>
          <h3>Student Snapshot</h3>

          <div className="form-field">
            <label htmlFor="activities">Activities you enjoy</label>
            <textarea
              id="activities"
              name="Activities"
              placeholder="Drawing, robotics club, cooking with grandma..."
              value={formData.Activities}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="subjects">Favorite subjects</label>
            <textarea
              id="subjects"
              name="Subjects"
              placeholder="Science, story writing, world history..."
              value={formData.Subjects}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="classes">Classes you are proud of</label>
            <textarea
              id="classes"
              name="Classes"
              placeholder="AP Biology, advanced art, intro to coding..."
              value={formData.Classes}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="extracurriculars">Extracurriculars</label>
            <textarea
              id="extracurriculars"
              name="Extracurriculars"
              placeholder="Volunteering, band, chess club..."
              value={formData.Extracurriculars}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="clubs">Clubs or teams</label>
            <textarea
              id="clubs"
              name="Clubs"
              placeholder="Girls Who Code, yearbook, basketball..."
              value={formData.Clubs}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="certifications">Certificates or awards</label>
            <textarea
              id="certifications"
              name="Certifications"
              placeholder="Babysitting course, digital badges, honor roll..."
              value={formData.Certifications}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="gpa">GPA (optional)</label>
            <select
              id="gpa"
              name="Gpa"
              value={formData.Gpa}
              onChange={handleChange}
            >
              <option value="">Pick a range</option>
              {gpaRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? "Finding ideas..." : "Show me careers"}
          </button>
        </form>
      </div>

      {errorMessage && <div className="info-banner error">{errorMessage}</div>}

      {aiResponse?.careers?.length > 0 && (
        <section className="card next-ideas-card">
          <h3>Careers picked just for you</h3>
          <p className="helper-text">
            Tap a card, talk with a mentor, or take one of the suggested first
            steps this week.
          </p>
          <div className="results-grid">
            {aiResponse.careers.map((career, index) => (
              <article key={index} className="result-card">
                <h4>{career.title}</h4>
                <p>{career.description}</p>
                {career.firstSteps && (
                  <ol className="steps-list">
                    {career.firstSteps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ol>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Careerfinder;
