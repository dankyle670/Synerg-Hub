import { useState } from "react";
import axios from "axios";
import styles from "../css/CreateUser.module.css";
import SidebarLayout from "../components/SidebarLayout";

function CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "president",
    pole: "dev",
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("http://localhost:5000/api/users", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ User created successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "president",
        pole: "dev",
      });
    } catch (err) {
      setMessage(
        "❌ " + (err.response?.data?.error || "User creation failed")
      );
    }
  };

  return (
    <SidebarLayout>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.card}>
          <h2 className={styles.title}>Create New Admin</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Temporary Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="president">Président</option>
            <option value="vice-president">Vice-Président</option>
            <option value="secretaire-general">Secrétaire Général</option>
            <option value="tresorier">Trésorier</option>
            <option value="cio">CIO</option>
            <option value="resp-com">Responsable Communication</option>
            <option value="resp-dev">Responsable Dev</option>
            <option value="resp-compta">Responsable Compta</option>
          </select>

          <select
            name="pole"
            value={formData.pole}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="dev">Développement</option>
            <option value="design">Design</option>
            <option value="com">Communication</option>
            <option value="compta">Comptabilité</option>
            <option value="rh">Ressources Humaines</option>
            <option value="juridique">Juridique</option>
            <option value="partenariat">Partenariat</option>
            <option value="strategie">Stratégie</option>
          </select>

          <button type="submit" className={styles.button}>
            Create Admin
          </button>

          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </SidebarLayout>
  );
}

export default CreateUser;
