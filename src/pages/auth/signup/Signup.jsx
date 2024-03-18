import "./signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import { Toast } from "../../../components/toast/Toast";


export const Signup = () => {

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "TrustGuardianHub | Signup";
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/signup", signupData);

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
  }
  return (
    <div className="signup-container">
      <div className="signup-container-main">
        <div className="signup-left">
          <img src="https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg" alt="background" />
        </div>
        <div className="signup-right">
          <h2>Create an account</h2>
          <hr />

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />

            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              placeholder="Password"
              required />

            <button type="submit" disabled={isLoading}>
              {isLoading ? <div className="loader"></div> : <p>Let&apos;s go</p>}
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
            <NavLink to="/login" className="login-link"> Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}
