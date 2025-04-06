import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/AllUsers.module.css";
import SidebarLayout from "../components/SidebarLayout";

// Use env variable for backend API
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        setMessage("Error loading users.");
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      //setMessage("Error deleting user.");
      setMessage((err.response?.data?.error || "User creation failed"));
    }
  };

  return (
    <SidebarLayout>
      <h2 className={styles.title}>All Users</h2>
      {message && <p className={styles.message}>{message}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Pole</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.pole}</td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(u._id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SidebarLayout>
  );
}

export default AllUsers;
