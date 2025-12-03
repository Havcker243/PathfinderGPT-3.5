import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    Career: "",
    Major: "",
    SchoolYear: "",
    Classes: "",
    Internships: "",
    Extracurriculars: "",
    Clubs: "",
    Certifications: "",
    Gpa: "",
  });

  const SchoolYear = [
    "Middle School",
    "High School",
    "First Year of College",
    "Second Year of College",
    "Third Year of College",
    "Fourth Year of College",
    "Graduate Student",
  ];
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
      const response = await fetch("http://localhost:5000/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Unable to fetch roadmap");
      }

      const responseData = await response.json();
      setAiResponse(responseData);
      navigate("/roadmap", { state: { aiResponse: responseData } });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "We could not build your roadmap yet. Please confirm the backend is running and try again."
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
          <span className="tag">Roadmap Generator</span>
          <h2>Paint a picture of your goals.</h2>
          <p className="helper-text">
            Pathfinder turns your answers into a four-year plan filled with
            courses, clubs, and real-world adventures that fit your dreams.
          </p>
          <ul className="checklist">
            <li>Share where you are in school right now.</li>
            <li>List classes, clubs, and certifications you have tried.</li>
            <li>Tell us the career you imagine so we can guide you there.</li>
          </ul>
        </section>

        <form className="card form-card" onSubmit={handleSubmit}>
          <h3>Your Story</h3>

          <div className="form-field">
            <label htmlFor="major">Major or focus</label>
            <input
              id="major"
              type="text"
              name="Major"
              placeholder="Biology, design, undecided..."
              value={formData.Major}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="career">Career dream</label>
            <input
              id="career"
              type="text"
              name="Career"
              placeholder="Marine biologist, UX designer..."
              value={formData.Career}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="schoolYear">Current year</label>
            <select
              id="schoolYear"
              name="SchoolYear"
              value={formData.SchoolYear}
              onChange={handleChange}
            >
              <option value="">Pick one</option>
              {SchoolYear.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="gpaRange">GPA (optional)</label>
            <select
              id="gpaRange"
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

          <div className="form-field">
            <label htmlFor="classes">Classes taken</label>
            <textarea
              id="classes"
              name="Classes"
              placeholder="Chemistry, animation, entrepreneurship..."
              value={formData.Classes}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="internships">Internships or jobs</label>
            <textarea
              id="internships"
              name="Internships"
              placeholder="Museum volunteer, summer research, daycare helper..."
              value={formData.Internships}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="extracurriculars">Extracurriculars</label>
            <textarea
              id="extracurriculars"
              name="Extracurriculars"
              placeholder="Robotics team, dance, esports..."
              value={formData.Extracurriculars}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="clubs">Clubs or groups</label>
            <textarea
              id="clubs"
              name="Clubs"
              placeholder="STEM club, local theater, environmental council..."
              value={formData.Clubs}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="certifications">Certificates and badges</label>
            <textarea
              id="certifications"
              name="Certifications"
              placeholder="Google data cert, CPR training..."
              value={formData.Certifications}
              onChange={handleChange}
            />
          </div>

          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? "Painting roadmap..." : "Generate Roadmap"}
          </button>
        </form>
      </div>

      {errorMessage && <div className="info-banner error">{errorMessage}</div>}

      {aiResponse && (
        <div className="card next-ideas-card">
          <h3>Your roadmap is ready!</h3>
          <p className="helper-text">
            We saved the latest version. Jump to the roadmap page to explore by
            year.
          </p>
          <button
            className="secondary-button"
            onClick={() => navigate("/roadmap", { state: { aiResponse } })}
          >
            View Roadmap
          </button>
        </div>
      )}
    </div>
  );
}
export default Form;
