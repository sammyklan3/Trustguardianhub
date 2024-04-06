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
                  <NavLink to="/profile">
                    <img
                      src={
                        user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                          user?.profile_url === ""
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          : user?.profile_url
                      }
                      alt={
                        user.username
                      }
                      className="profile-image" />
                  </NavLink>
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
                  src={
                    user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                      user?.profile_url === ""
                      ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      : user?.profile_url
                  }
                  alt=
                  {
                    user ? user.username : "default username"
                  }
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

      case `/report/${id}`:
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

        case "/admin":
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

          case "/upgrade":
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
