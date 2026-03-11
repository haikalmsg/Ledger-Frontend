import { Link } from "react-router-dom";
import styles from "./register-success-page.module.css";

export default function RegisterSuccessPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <div className={styles.icon}>✓</div>
        </div>

        <h1 className={styles.title}>Registration Successful</h1>
        <p className={styles.description}>
          Your account has been created successfully. You can now log in and start using your ledger dashboard.
        </p>

        <div className={styles.actions}>
          <Link to="/login" className={styles.primaryButton}>
            Go to Login
          </Link>
          <Link to="/register" className={styles.secondaryButton}>
            Register Another
          </Link>
        </div>
      </div>
    </div>
  );
}