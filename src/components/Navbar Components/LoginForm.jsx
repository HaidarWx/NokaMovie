import { useState } from "react";

export function LoginForm() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-wrap">
        <div className="login-card">
          <div className="login-card-header">
            <h1>Login</h1>
          </div>

          <form action="" className="login-card-login">
            <span className="login-field-username">
              <input type="text" placeholder="Username" />
            </span>
            <span className="login-field-password">
              <span className="field-password">
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
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
          </form>

          <div className="login-card-footer">
            <button className="login-button-submit">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
