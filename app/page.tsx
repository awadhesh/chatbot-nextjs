import Chatbot from "../components/Chatbot";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.layout}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Customer Support</p>
        <h1>Chatbot for your Next.js website</h1>
        <p className={styles.copy}>
          This version is built for the Next.js App Router. The chatbot UI lives
          in a reusable client component, so you can place it on a landing page,
          support page, or inside a floating widget later.
        </p>
      </section>

      <Chatbot />
    </main>
  );
}
