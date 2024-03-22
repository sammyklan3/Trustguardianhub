import { useState } from 'react';
import "./navbar.css";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';


export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
                <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                <nav>
                  <NavLink to="#" onClick={logoutBtn}>Logout</NavLink>
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
              <NavLink to="#" onClick={logoutBtn}>Logout</NavLink>
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
