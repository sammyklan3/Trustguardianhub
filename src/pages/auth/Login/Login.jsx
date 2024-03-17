import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import { Toast } from "../../../components/toast/Toast";

export const Login = () => {

  // Storing form data
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Function for handling change in the form state
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });
  };

  // Submutting form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/login", loginData);

      if (response.status == 200) {
        setShowToast(true);
        setToastType("success");
        setToastMessage(response.data.message);
        navigate("/dashboard");
      }
    } catch (err) {
      setShowToast(true);
      setToastType("error");
      setToastMessage(err.response.data.error);
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

          {/* Form input */}
          <form onSubmit={handleSubmit}>

            {/* Username input */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              required
            />

            {/* Password input */}
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

  )

};

