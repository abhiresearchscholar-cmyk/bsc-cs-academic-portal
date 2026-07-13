async function loadJson(path) {
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(path + separator + "v=20260713-mdc-lecture01");
  if (!response.ok) {
    throw new Error("Could not load " + path);
  }
  return response.json();
}

function statusClass(status) {
  return String(status || "").toLowerCase().replace(/\s+/g, "-");
}

function isAvailable(status) {
  return String(status || "").toLowerCase() === "available" || String(status || "").toLowerCase() === "open";
}

function linkButton(url, label, className) {
  const disabled = !url || url === "#";
  return `<a href="${disabled ? "#" : url}" class="${className}${disabled ? " disabled" : ""}"${disabled ? ' aria-disabled="true"' : ""}>${label}</a>`;
}

function textForSearch(values) {
  return values.filter(Boolean).join(" ").toLowerCase();
}

function setupSearch(inputSelector, itemSelector) {
  const input = document.querySelector(inputSelector);
  if (!input) {
    return;
  }

  input.addEventListener("input", function () {
    const query = input.value.trim().toLowerCase();
    document.querySelectorAll(itemSelector).forEach(function (item) {
      const haystack = item.getAttribute("data-search-text") || item.textContent.toLowerCase();
      item.hidden = query && !haystack.includes(query);
    });
  });
}

async function renderSemesters() {
  const container = document.querySelector("[data-render='semesters']");
  if (!container) {
    return;
  }

  const semesters = await loadJson("data/semesters.json");
  container.innerHTML = semesters.map(function (semester) {
    return `
      <a class="academic-card searchable-item" href="${semester.link}" data-search-text="${textForSearch([semester.name, semester.title, semester.description, semester.status])}">
        <span>${semester.name}</span>
        <strong>${semester.title}</strong>
        <p>${semester.description}</p>
        <em class="status-badge ${statusClass(semester.status)}">${semester.status}</em>
      </a>
    `;
  }).join("");
}

async function renderSemesterOneCourses() {
  const container = document.querySelector("[data-render='semester1-courses']");
  if (!container) {
    return;
  }

  const courses = await loadJson("data/semester1-courses.json");
  container.innerHTML = courses.map(function (course) {
    return `
      <article class="course-card searchable-item ${course.type === "MDC Course" ? "mdc-course-card" : ""}" data-search-text="${textForSearch([course.code, course.title, course.description, course.type, course.status])}">
        <div class="course-meta">
          <p class="tag">${course.code}</p>
          ${course.type ? `<span class="course-type ${course.type === "MDC Course" ? "mdc-type" : ""}">${course.type}</span>` : ""}
        </div>
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <p><span class="status-badge ${statusClass(course.status)}">${course.status}</span></p>
        <div class="card-actions">
          ${linkButton(course.overviewLink, "Overview", "button small")}
          ${linkButton(course.lecturesLink, "Lectures", "button small secondary")}
          ${linkButton(course.assignmentsLink, "Assignments", "button small muted")}
          ${linkButton(course.quizzesLink, "Quizzes", "button small muted")}
          ${linkButton(course.labLink, "Lab", "button small muted")}
        </div>
      </article>
    `;
  }).join("");
}

async function renderLectures() {
  const container = document.querySelector("[data-render='semester1-lectures']");
  if (!container) {
    return;
  }

  const lectures = await loadJson("data/semester1-lectures.json");
  container.innerHTML = lectures.map(function (lecture) {
    return `
      <article class="card lecture-card searchable-item" data-search-text="${textForSearch([lecture.number, lecture.title, lecture.section, lecture.description, lecture.status])}">
        <p class="tag">${lecture.section}</p>
        <h2>Lecture ${lecture.number}: ${lecture.title}</h2>
        <p>${lecture.description}</p>
        <p><span class="status-badge ${statusClass(lecture.status)}">${lecture.status}</span></p>
        <div class="card-actions">
          ${lecture.lecture ? linkButton(lecture.lecture, "Open Lecture", "button small") : linkButton("#", "Lecture Coming Soon", "button small")}
          ${lecture.notes && lecture.notes !== "#" ? linkButton(lecture.notes, "PDF Notes", "button small secondary") : ""}
        </div>
      </article>
    `;
  }).join("");
  setupSearch("#lecture-search", ".lecture-card");
}

async function renderMdcComputerFundamentalsLectures() {
  const container = document.querySelector("[data-render='mdc-computer-fundamentals-lectures']");
  if (!container) {
    return;
  }

  const lectures = await loadJson("data/mdc-computer-fundamentals-lectures.json");
  container.innerHTML = lectures.map(function (lecture) {
    return `
      <article class="card lecture-card mdc-lecture-card searchable-item" data-search-text="${textForSearch([lecture.number, lecture.title, lecture.section, lecture.description, lecture.status])}">
        <p class="tag">${lecture.section}</p>
        <h2>Lecture ${lecture.number}: ${lecture.title}</h2>
        <p>${lecture.description}</p>
        <p><span class="status-badge ${statusClass(lecture.status)}">${lecture.status}</span></p>
        <div class="card-actions">
          ${linkButton(lecture.lecture, "Open Lecture", "button small")}
          ${lecture.notes && lecture.notes !== "#" ? linkButton(lecture.notes, "PDF Notes", "button small secondary") : ""}
        </div>
      </article>
    `;
  }).join("");
  setupSearch("#mdc-lecture-search", ".mdc-lecture-card");
}

async function renderAssignments() {
  const container = document.querySelector("[data-render='semester1-assignments']");
  if (!container) {
    return;
  }

  const assignments = await loadJson("data/semester1-assignments.json");
  container.innerHTML = assignments.map(function (assignment) {
    return `
      <article class="card searchable-item" data-search-text="${textForSearch([assignment.number, assignment.title, assignment.topic, assignment.instructions, assignment.status])}">
        <p class="tag">Assignment ${assignment.number} · Due: ${assignment.dueDate}</p>
        <h2>${assignment.title}</h2>
        <p><strong>Topic:</strong> ${assignment.topic}</p>
        <p><strong>Instructions:</strong> ${assignment.instructions}</p>
        <p><span class="status-badge ${statusClass(assignment.status)}">${assignment.status}</span></p>
        <div class="card-actions">
          ${linkButton(assignment.download, "Download Questions", "button small secondary")}
          ${linkButton(assignment.submit, "Submit", "button small")}
        </div>
      </article>
    `;
  }).join("");
  setupSearch("#assignment-search", ".card.searchable-item");
}

async function renderQuizzes() {
  const container = document.querySelector("[data-render='semester1-quizzes']");
  if (!container) {
    return;
  }

  const quizzes = await loadJson("data/semester1-quizzes.json");
  container.innerHTML = quizzes.map(function (quiz) {
    const quizLink = quiz.quizFile && quiz.quizFile !== "#" ? "quiz-player.html?quiz=" + encodeURIComponent(quiz.quizFile) : "#";
    return `
      <article class="card searchable-item" data-search-text="${textForSearch([quiz.number, quiz.title, quiz.topic, quiz.status])}">
        <p class="tag">Quiz ${quiz.number} · Marks: ${quiz.marks}</p>
        <h2>${quiz.title}</h2>
        <p><strong>Topic:</strong> ${quiz.topic}</p>
        <p><span class="status-badge ${statusClass(quiz.status)}">${quiz.status}</span></p>
        ${linkButton(quizLink, "Attempt Practice Quiz", "button primary")}
      </article>
    `;
  }).join("");
  setupSearch("#quiz-search", ".card.searchable-item");
}

function formatDate(value) {
  return new Date(value + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

async function renderAnnouncements() {
  const fullContainer = document.querySelector("[data-render='announcements']");
  const latestContainer = document.querySelector("[data-render='latest-announcements']");
  if (!fullContainer && !latestContainer) {
    return;
  }

  const announcements = await loadJson("data/announcements.json");
  const sorted = announcements.sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  function card(item) {
    return `
      <article class="announcement searchable-item" data-search-text="${textForSearch([item.date, item.title, item.message, item.category])}">
        <time datetime="${item.date}">${formatDate(item.date)}</time>
        <p class="tag">${item.category}${item.important ? " · Important" : ""}</p>
        <h2>${item.title}</h2>
        <p>${item.message}</p>
      </article>
    `;
  }

  if (fullContainer) {
    fullContainer.innerHTML = sorted.map(card).join("");
    setupSearch("#announcement-search", ".announcement.searchable-item");
  }

  if (latestContainer) {
    latestContainer.innerHTML = sorted.slice(0, 3).map(card).join("");
  }
}

function setupStaticSearch() {
  setupSearch("#question-search", ".question-search-item");
}

renderSemesters();
renderSemesterOneCourses();
renderLectures();
renderMdcComputerFundamentalsLectures();
renderAssignments();
renderQuizzes();
renderAnnouncements();
setupStaticSearch();
