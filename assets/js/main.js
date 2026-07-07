const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const heroTypeLines = document.querySelectorAll("[data-hero-type-line]");

function wait(milliseconds) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, milliseconds);
  });
}

async function typeHeroTerminal() {
  if (!heroTypeLines.length) {
    return;
  }

  while (true) {
    for (const line of heroTypeLines) {
      line.textContent = "";
    }

    for (const line of heroTypeLines) {
      const text = line.getAttribute("data-hero-type-line") || "";

      for (let index = 0; index < text.length; index += 1) {
        line.textContent += text[index];
        await wait(34);
      }

      await wait(380);
    }

    await wait(2600);
  }
}

typeHeroTerminal();

if (navToggle && siteNav) {
  navToggle.addEventListener("click", function () {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function aiNoticeMarkup() {
  return `
    <div class="ai-widget-header">
      <img src="assets/images/silentroot.png" alt="">
      <div>
        <strong>AI Course Assistant</strong>
        <span>Lab access only</span>
      </div>
      <button class="ai-widget-close" type="button" aria-label="Close AI assistant">×</button>
    </div>
    <div class="ai-widget-body lab-only">
      <div class="chat-message assistant">
        AI Assistant is available only in the computer lab.
      </div>
      <p class="ai-lab-note">
        Please use the lab computer or the approved lab network to access the local LLM. Outside the lab, use lecture notes, quizzes, assignments, and question banks for study.
      </p>
      <a class="button small secondary" href="ai-assistant.html">Open AI Assistant Page</a>
    </div>
  `;
}

let aiWidget = document.querySelector("#ai-widget");

if (!aiWidget) {
  aiWidget = document.createElement("aside");
  aiWidget.className = "ai-widget";
  aiWidget.id = "ai-widget";
  aiWidget.setAttribute("aria-label", "AI Course Assistant");
  aiWidget.hidden = true;
  document.body.appendChild(aiWidget);
}

aiWidget.innerHTML = aiNoticeMarkup();

if (!document.querySelector(".ai-widget-launcher")) {
  const launcher = document.createElement("button");
  launcher.className = "ai-widget-launcher open-ai-widget";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open AI Course Assistant");
  launcher.innerHTML = '<img src="assets/images/silentroot.png" alt=""><span>Ask AI</span>';
  document.body.appendChild(launcher);
}

document.querySelectorAll(".open-ai-widget").forEach(function (button) {
  button.addEventListener("click", function () {
    aiWidget.hidden = false;
  });
});

const aiCloseButton = document.querySelector(".ai-widget-close");

if (aiCloseButton) {
  aiCloseButton.addEventListener("click", function () {
    aiWidget.hidden = true;
  });
}
