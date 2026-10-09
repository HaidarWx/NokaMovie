import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionId } from "../../hooks/useSessionId.jsx";

import { SyncLoader } from "react-spinners";

export function LoginForm({ sessionId, setSessionId }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const session = await getSessionId(username, password);
      setSessionId(session);
      console.log(session);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-modal-overlay">
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px",
            position: "absolute",
            top: "50",
            left: "50",
          }}
        >
          <SyncLoader color="black" size={50} />
        </div>
      )}
      <div className="login-modal-wrap">
        <div className="login-card">
          <div className="login-card-header">
            <h1>Login</h1>
          </div>

          <form action="" className="login-card-login" onSubmit={handleLogin}>
            <span className="login-field-username">
              <input
                type="text"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
            </span>
            <span className="login-field-password">
              <span className="field-password">
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
              </span>

              {visible ? (
                <i
                  className="bi bi-eye"
                  onClick={() => {
                    setVisible(false);
                  }}
                ></i>
              ) : (
                <i
                  className="bi bi-eye-slash"
                  onClick={() => {
                    setVisible(true);
                  }}
                ></i>
              )}
            </span>

            <div className="login-card-footer">
              {error && (
                <div className="login-failed">
                  <span style={{ fontSize: "12px" }}>{error}</span>
                </div>
              )}

              <button type="submit" className="login-button-submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
