import { useNavigate } from "react-router-dom";
import styles from "../css/Home.module.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to Synerg' Hub</h1>
        <p className={styles.subtitle}>
          Your internal platform to manage everything at Synerghetic.
        </p>
        <button className={styles.button} onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Home;
