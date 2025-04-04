import SidebarLayout from "../components/SidebarLayout";
import styles from "../css/Dashboard.module.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <SidebarLayout>
      <div className={styles.content}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.description}>
          Welcome, <strong>{user?.username}</strong>
        </p>
        <p className={styles.description}>
          Select a feature from the menu to begin managing Synerg Hub.
        </p>
      </div>
    </SidebarLayout>
  );
}

export default Dashboard;
