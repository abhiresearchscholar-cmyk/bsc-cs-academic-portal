# B.Sc. Computer Science Academic Portal

Static GitHub Pages website for B.Sc. Computer Science students of Govt. Degree College Bhoranj, Himachal Pradesh.

The website uses only static files:

- HTML
- CSS
- JavaScript
- JSON data files
- images and downloadable files

No backend code and no API keys are stored in this repository.

## Main Folder Structure

```text
/
├── index.html
├── semester-1.html
├── semester-2.html
├── second-year.html
├── third-year.html
├── about.html
├── lectures.html
├── assignments.html
├── quizzes.html
├── quiz-player.html
├── lab.html
├── question-bank.html
├── announcements.html
├── ai-assistant.html
├── data/
│   ├── semesters.json
│   ├── semester1-courses.json
│   ├── semester1-lectures.json
│   ├── semester1-assignments.json
│   ├── semester1-quizzes.json
│   └── announcements.json
├── quizzes/
│   └── semester1/
│       └── quiz-01-computer-basics.json
├── downloads/
│   └── semester1/
│       ├── lectures/
│       ├── notes/
│       ├── ppt/
│       ├── assignments/
│       └── question-bank/
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── main.js
    │   ├── data-render.js
    │   ├── quiz-player.js
    │   ├── config.js
    │   └── ai-assistant.js
    ├── images/
    └── files/
```

## How to Add a New Lecture

Open:

```text
data/semester1-lectures.json
```

Copy an existing lecture object and update:

- `number`
- `title`
- `section`
- `description`
- `ppt`
- `notes`
- `quiz`
- `status`

Use `#` when a file is not available yet.

Lecture cards currently show only:

- PPT
- PDF Notes
- Practice Quiz

## How to Upload PPT/PDF Files

Place files in these folders:

```text
downloads/semester1/ppt/
downloads/semester1/notes/
downloads/semester1/assignments/
downloads/semester1/question-bank/
```

Example:

```json
"notes": "downloads/semester1/notes/lecture-01-notes.pdf"
```

## How to Create a New Quiz JSON

Create a new file inside:

```text
quizzes/semester1/
```

Use this format:

```json
{
  "title": "Quiz Title",
  "topic": "Topic Name",
  "marks": 10,
  "note": "Practice quiz only. Marks are not officially recorded.",
  "questions": [
    {
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0,
      "explanation": "Short explanation."
    }
  ]
}
```

Then add it to:

```text
data/semester1-quizzes.json
```

## How to Add Assignments

Open:

```text
data/semester1-assignments.json
```

Update assignment title, topic, instructions, due date, download link, submit link, and status.

Official assignment submission may be through Google Classroom or Google Form as announced by the teacher.

## How to Add Announcements

Open:

```text
data/announcements.json
```

Add a new announcement object:

```json
{
  "date": "2026-08-20",
  "title": "Announcement Title",
  "message": "Simple message for students.",
  "category": "General",
  "important": false
}
```

The homepage automatically shows the latest 3 announcements.

## How to Change AI Backend URL

Open:

```text
assets/js/config.js
```

Change:

```js
const AI_BACKEND_URL = "http://192.168.100.50:8000/api/chat";
```

Do not put API keys, passwords, tokens, or private credentials in this website.

The AI Assistant is a frontend-only placeholder. The actual local LLM backend must run separately and should be used only inside the computer lab / college LAN.

## How to Deploy on GitHub Pages

1. Upload these files to a GitHub repository.
2. Go to repository `Settings`.
3. Open `Pages`.
4. Choose `Deploy from a branch`.
5. Select the `main` branch and root folder `/`.
6. Save.

GitHub Pages will publish the static website.

## Editing Tips

- Keep language simple for beginner students.
- Use short headings.
- Use `#` for links that are not ready.
- Keep real backend secrets outside this public repository.
