import { Link } from "react-router-dom";
import styles from "./not-found-page.module.css";

export default function NotFoundPage() {
  const token = localStorage.getItem("access_token");

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          Sorry, the page you are looking for does not exist or may have been moved.
        </p>

        <div className={styles.actions}>
          <Link
            to={token ? "/transactions" : "/login"}
            className={styles.primaryButton}
          >
            {token ? "Go to Dashboard" : "Go to Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}