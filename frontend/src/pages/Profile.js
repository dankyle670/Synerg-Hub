import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/Profile.module.css";
import SidebarLayout from "../components/SidebarLayout";

function Profile() {
  const token = localStorage.getItem("token");
  //const storedUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    pole: "",
    bio: "",
    avatar: "",
    phone: "",
    linkedin: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data.user);
      } catch (err) {
        setMessage("Failed to load profile");
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.put("http://localhost:5000/api/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(res.data.user)); // update localStorage
    } catch (err) {
      setMessage("❌ Failed to update profile");
    }
  };

  return (
    <SidebarLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>My Profile</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Username</label>
            <input name="username" value={formData.username} onChange={handleChange} disabled />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} disabled />
          </div>

          <div className={styles.field}>
            <label>Role</label>
            <input name="role" value={formData.role} disabled />
          </div>

          <div className={styles.field}>
            <label>Pole</label>
            <input name="pole" value={formData.pole} disabled />
          </div>

          <div className={styles.field}>
            <label>Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Avatar URL</label>
            <input name="avatar" value={formData.avatar} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>LinkedIn</label>
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} />
          </div>

          <button type="submit" className={styles.saveBtn}>Save Changes</button>

          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </SidebarLayout>
  );
}

export default Profile;
