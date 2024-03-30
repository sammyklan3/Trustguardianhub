import { useState, useContext } from 'react';
import "./navbar.css";
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';


export const Navbar = () => {
  const location = useLocation();
  const { id } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const logoutBtn = () => {
    navigate("/logout");
  }

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX) {
      return;
    }

    const touchEndX = e.touches[0].clientX;
    const touchDiffX = touchEndX - touchStartX;

    if (touchDiffX > 50) { // Adjust the threshold as needed
      setIsMobileMenuOpen(false);
    }

    touchStartX = null;
  };

  let touchStartX = null;

  const renderNavbarItems = () => {
    switch (location.pathname) {
      case "/":
        return (
          <header className="dashboard-header">
            <p className='logo'>
              <NavLink to="/">TrustGuardianHub</NavLink>
            </p>

            <nav>
              <div className="nav-links">
                <NavLink to="/about">FAQ</NavLink>
              </div>
              <div className="login-link"><NavLink to="/login">Login</NavLink></div>
            </nav>
          </header>
        );
      case '/about':
        return null;
      case "/dashboard":
        return (
          <>
            <header>
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>
                <nav>
                  <NavLink to="/notifications">Notifications</NavLink>
                  <NavLink to="/profile"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt={user.username} className="profile-image" /></NavLink>
                </nav>
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>

              <NavLink to="#" onClick={logoutBtn}>Logout</NavLink>

              <NavLink to="/profile">
                <img
                  src={user ? user.profile_url : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
                  alt={user ? user.username : "default username"}
                  className="profile-image"
                />

              </NavLink>
            </nav>
          </>
        );

      case "/create-report":
        return (
          <>
            <header>
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>
                <nav>
                  <NavLink to="/dashboard/settings">Settings</NavLink>
                </nav>
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <NavLink to="/dashboard/settings">Settings</NavLink>
              <NavLink to="/dashboard/notifications">Notifications</NavLink>
            </nav>
          </>
        );

      case "/profile":
        return (
          <>
            <header>
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>
                <nav>
                  <NavLink to="/dashboard/settings">Settings</NavLink>
                </nav>
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <NavLink to="/dashboard/settings">Settings</NavLink>
              <NavLink to="/dashboard/notifications">Notifications</NavLink>
            </nav>
          </>
        );

        case `/update-report/${id}`:
        return (
          <>
            <header>
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>
                <nav>
                  <NavLink to="/dashboard/settings">Settings</NavLink>
                </nav>
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <NavLink to="/dashboard/settings">Settings</NavLink>
              <NavLink to="/dashboard/notifications">Notifications</NavLink>
            </nav>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <nav>
      {renderNavbarItems()}
    </nav>
  );
};
