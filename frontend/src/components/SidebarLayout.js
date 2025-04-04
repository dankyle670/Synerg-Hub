import { useNavigate } from "react-router-dom";
import styles from "../css/Dashboard.module.css";

function SidebarLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Synerg Hub</h2>
        <nav className={styles.nav}>
          <a href="/dashboard">🏠 Dashboard</a>
          <a href="/admin/create-user">➕ Add Member</a>
          <a href="/admin/all-users">🧑‍💼 All Users</a>
          <a href="/profile">👤 Profile</a>
          <a href="/admin">🔐 Admin Zone</a>
        </nav>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.header}>
          <span>
            Welcome, <strong>{user?.username}</strong>
          </span>
          <button className={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </header>

        <section className={styles.content}>{children}</section>
      </div>
    </div>
  );
}

export default SidebarLayout;
