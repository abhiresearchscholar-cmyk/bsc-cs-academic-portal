const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatWindow = document.querySelector("#chat-window");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");
const languageSelect = document.querySelector("#assistant-language");
const modeSelect = document.querySelector("#assistant-mode");

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = "chat-message " + type;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

if (chatForm) {
  chatForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const question = chatInput.value.trim();
    if (!question) {
      return;
    }

    addMessage(question, "student");
    chatInput.value = "";
    loadingMessage.hidden = false;
    errorMessage.hidden = true;

    try {
      const response = await fetch(AI_BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question,
          language: languageSelect.value,
          mode: modeSelect.value
        })
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();
      addMessage(data.reply || "No reply received from the assistant.", "assistant");
    } catch (error) {
      errorMessage.hidden = false;
      addMessage("The local AI backend is offline or not reachable. Please use this feature in the computer lab when the local LLM server is running.", "assistant");
    } finally {
      loadingMessage.hidden = true;
    }
  });
}
