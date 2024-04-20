import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import { Toast } from "../../../components/toast/Toast";
import { AuthContext } from "../../../context/authContext";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const { login } = useContext(AuthContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "TrustGuardianHub | Login";
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/login", loginData);

      if (response.status === 200) {
        const { token } = response.data;
        login(token);
        setShowToast(true);
        setToastType("success");
        setToastMessage(response.data.message);
        navigate("/dashboard"); // Redirect to the previous page or dashboard
      }
    } catch (err) {
      setShowToast(true);
      setToastType("error");
      setToastMessage(err.response ? err.response.data.error : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-main">
        <div className="login-left">
          <img src="https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg" alt="background" />
        </div>
        <div className="login-right">
          <h2>Login</h2>
          <hr />

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? <div className="loader"></div> : "Login"}
            </button>
            {showToast && (
              <Toast
                message={toastMessage}
                duration={3000}
                type={toastType}
                onClose={() => setShowToast(false)}
              />
            )}
          </form>

          <p>
            Don&apos;t have an account?
            <NavLink to="/signup" className="login-register-link"> Register</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};