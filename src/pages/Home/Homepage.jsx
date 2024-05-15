import "./homepage.css";
import landing from "../../assets/landing-img.png";
import { Navbar } from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export const Homepage = () => {

  const { token } = useContext(AuthContext);

  return (
    <div className="homepage-container">
      <Navbar />
      <div className="homepage-content">
        <img src={landing} alt="landing" />
        <div className="homepage-text">
          <h1>Tired of getting scammed ?</h1>
          <p>
            Are you tired of encountering scams or unreliable clients in your freelance work? Look no further. TrustGuardianHub is here to empower you to report scams and unreliable behavior, making the freelance marketplace safer and more trustworthy for everyone.
          </p>
          <p className="homepage-text-muted">
            Join Us Today and Help Build a Safer Freelance Marketplace!
          </p>
          <div className="login-link">
            {token ? (
              <NavLink to="/dashboard">Go to Dashboard</NavLink>
            ) : <NavLink to="/signup">Get started</NavLink>}
          </div>
        </div>
      </div>
    </div>
  )
}