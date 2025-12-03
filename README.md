# Pathfinder

## Description
Pathfinder is a playful web guide for students (ages 8–30) who are exploring interests, classes, and future careers. The refreshed interface keeps copy simple, navigation obvious, and flows focused on two core helpers:

- **Career Finder**: Collects hobbies, classes, clubs, and GPA to suggest careers written in friendly language plus two starter steps.
- **Roadmap Generator**: Builds a four-year action plan with courses, clubs, certifications, and advice based on student inputs.

## Tech Stack
- React 18 + React Router for the frontend experience
- Tailwind/DaisyUI-inspired custom CSS for bright, accessible styling
- Flask + Flask-CORS for the API layer
- OpenAI GPT-3.5 for dynamic content generation

## Requirements
- Node.js 18+
- Python 3.8+
- An OpenAI API key stored in a `.env` file as `OPENAI_API_KEY`

## Getting Started
### 1. Backend (Flask)
```bash
cd Backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
# create Backend/.env and add OPENAI_API_KEY=sk-...
python app.py
```
Flask now serves the API on `http://localhost:5000`.

### 2. Frontend (React)
```bash
cd Frontend
npm install
npm start
```
The React app will open at `http://localhost:3000` and talk to the local Flask server.

## Experience Tour
1. **Homepage** – Highlights the refreshed kid-friendly look with CTA buttons to the two tools plus a "Next Ideas" callout.
2. **Career Finder** – Uses one-page forms, large text areas, and instant AI feedback cards. The backend now enforces JSON responses for predictable rendering.
3. **Roadmap Form** – Breaks the long form into labeled sections with helper text and optimistic updates when the AI returns a plan.
4. **Roadmap View** – Replaces the old timeline with colorful cards grouped by year so each action is readable at a glance. A sample plan loads automatically if no AI response is present.

## Next Ideas
- Weekly "tiny challenge" reminders to keep students motivated between sessions.
- Saved career boards so learners can compare interests with mentors.
- Sticker-style progress tracking that rewards finishing roadmap steps.

## License
Specify the license for your project (e.g., MIT, GPL) here.
