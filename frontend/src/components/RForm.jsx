import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function RForm({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(route, { username, password, email });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/"); // redirection après login
      } else {
        navigate("/login"); // redirection après register
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Le JSX doit être retourné ici, à l'extérieur de handleSubmit
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h1>{name}</h1>

        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-neutral mt-4"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : name}
        </button>
      </fieldset>
    </form>
  );
}

export default RForm;
