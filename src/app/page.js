"use client";

import PromptForm from "./components/prompt-form";
import MarkdownRenderer from "./components/markdown-renderer";
import { Analytics } from "@vercel/analytics/react"

import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <p className={styles.p}>Please upload an image of the item you wish to dispose of:</p>

        <PromptForm
          isLoading={isLoading}
          onSubmit={async (file) => {
            setIsLoading(true);
            const form = new FormData();
            form.append("image", file);

            const response = await fetch("/api/chatgpt", {
              method: "POST",
              body: form,
            });

            setIsLoading(false);
            const result = await response.json();
            setChoices(Array.isArray(result.choices) ? result.choices : []);
          }}
        />
        <br></br><br></br>
        {choices?.map((choice) => (
          <MarkdownRenderer className={styles.response} key={choice.index} content={choice.message.content} />
        ))}
      </div>
      <Analytics />
    </main>
  );
}
