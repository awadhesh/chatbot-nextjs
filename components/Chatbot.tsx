"use client";

import { FormEvent, useState } from "react";
import styles from "./Chatbot.module.css";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

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

function getBotReply(input: string) {
  const normalizedInput = input.toLowerCase();

  const match = botResponses.find(({ keywords }) =>
    keywords.some((keyword) => normalizedInput.includes(keyword))
  );

  if (match) {
    return match.response;
  }

  return "I do not have a specific answer for that yet. Leave your email and message, and our team can follow up.";
}

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "Welcome. Ask me a question about your business and I will reply instantly."
    }
  ]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: trimmed
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "bot",
          text: getBotReply(trimmed)
        }
      ]);
    }, 450);
  }

  return (
    <section className={styles.shell} aria-label="Chatbot">
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Assistant</p>
          <h2>Help Desk Bot</h2>
        </div>
        <span className={styles.status}>Online</span>
      </div>

      <div className={styles.messages} aria-live="polite">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`${styles.message} ${
              message.role === "user" ? styles.user : styles.bot
            }`}
          >
            <p>{message.text}</p>
          </article>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.srOnly} htmlFor="chat-input">
          Type your message
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          type="text"
          placeholder="Ask about pricing, support, hours..."
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
