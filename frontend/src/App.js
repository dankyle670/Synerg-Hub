import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateUser from './pages/CreateUser';
import AllUsers from "./pages/AllUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/create-user" element={<CreateUser />} />
        <Route path="/admin/all-users" element={<AllUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
