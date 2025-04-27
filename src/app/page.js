"use client";

import PromptForm from "./components/prompt-form";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
    const [choices, setChoices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <main className={styles.main}>
            <div className={styles.card}>
                <p>Hello!</p>

                <PromptForm
                    isLoading={isLoading}
                    onSubmit={async (file) => {
                        setIsLoading(true);

                        // Build FormData so browser sets multipart/form-data
                        const form = new FormData();
                        form.append("image", file);

                        const response = await fetch("/api/chatgpt", {
                            method: "POST",
                            body: form,      // <-- no manual headers
                        });

                        setIsLoading(false);

                        const result = await response.json();
                        setChoices(Array.isArray(result.choices) ? result.choices : []);
                    }}
                />

                {choices?.map((choice) => (
                    <p className={styles.response} key={choice.index}>
                        {choice.message.content}
                    </p>
                ))}
            </div>
        </main>
    );
}
