const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

const botResponses = [
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hello. I can help with pricing, opening hours, support, or contact details."
  },
  {
    keywords: ["price", "pricing", "cost", "plan"],
    response: "Our plans start at $29 per month for basic support and $99 per month for full-service assistance."
  },
  {
    keywords: ["hours", "open", "closing", "time"],
    response: "Support is available Monday to Friday, 9:00 AM to 6:00 PM."
  },
  {
    keywords: ["contact", "email", "phone", "call"],
    response: "You can reach us at support@example.com or call +1 (555) 123-4567."
  },
  {
    keywords: ["refund", "cancel", "return"],
    response: "For refunds or cancellations, send your order number and request to support@example.com."
  }
];

function addMessage(role, text) {
  const message = document.createElement("article");
  message.className = `message ${role}`;

  const body = document.createElement("p");
  body.textContent = text;
  message.appendChild(body);

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(input) {
  const normalizedInput = input.toLowerCase();

  const match = botResponses.find(({ keywords }) =>
    keywords.some((keyword) => normalizedInput.includes(keyword))
  );

  if (match) {
    return match.response;
  }

  return "I do not have a specific answer for that yet. Leave your email and message, and our team can follow up.";
}

function seedConversation() {
  addMessage("bot", "Welcome. Ask me a question about your business and I will reply instantly.");
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userMessage = chatInput.value.trim();
  if (!userMessage) {
    return;
  }

  addMessage("user", userMessage);
  chatInput.value = "";

  window.setTimeout(() => {
    addMessage("bot", getBotReply(userMessage));
  }, 450);
});

seedConversation();
