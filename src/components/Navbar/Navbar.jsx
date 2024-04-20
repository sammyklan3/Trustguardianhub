import { useState, useContext } from 'react';
import "./navbar.css";
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { FaGear, FaBell, FaPlus } from "react-icons/fa6";


export const Navbar = () => {
  const location = useLocation();
  const { id } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const toggleSettings = () => {
    setSettingsOpen(prevState => !prevState);
  };

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
              {/* Logo section */}
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>

                {/* Nav links */}
                <nav>
                  <NavLink to="/create-report"><FaPlus /> Create</NavLink>
                  <NavLink to="/edit-report">My reports</NavLink>
                  <NavLink to="/notifications" className="notification-icon"><FaBell /></NavLink>
                  <NavLink to="/profile">
                    <img
                      src={
                        user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                          user?.profile_url === ""
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          : user?.profile_url
                      }
                      alt={
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                  </NavLink>
                </nav>

                {/* Hamburger */}
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>

            {/* Navbar for mobile */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <div className="nav-links">
                <NavLink to="/notifications">Notifications</NavLink>
                <NavLink to="/create-report">Create a report</NavLink>
                <NavLink to="/edit-report">My reports</NavLink>
              </div>

              <div className="nav-footer">
                <hr />
                <div className="footer-container">
                  <div className="user-info">
                    <img
                      src={
                        user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                          user?.profile_url === ""
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          : user?.profile_url
                      }
                      alt={
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                    <p>{user ? user.username : "Guest"}</p>
                  </div>
                  {settingsOpen ? (
                    <>
                      <div className="settings-options">
                        <NavLink to="/profile">Profile</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
                        <NavLink to="/upgrade">Upgrade 🚀</NavLink>
                      </div>
                      <div className="settings-overlay" onClick={toggleSettings}></div>
                    </>
                  ) : null}
                  <p onClick={toggleSettings} className="settings-toggle"><FaGear fontSize={20} /></p>
                </div>
              </div>
            </nav>
          </>
        );

      // Link to create a report page
      case "/create-report":
        return (
          <>
            <header>
              {/* Logo section */}
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>

                {/* Nav links */}
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
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                  </NavLink>
                </nav>

                {/* Hamburger */}
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>

            {/* Navbar for mobile */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <div className="nav-links">
                <NavLink to="/notifications">Notifications</NavLink>
                <NavLink to="/create-report">Create a report</NavLink>
                <NavLink to="/edit-report">My reports</NavLink>
              </div>

              <div className="nav-footer">
                <hr />
                <div className="footer-container">
                  <div className="user-info">
                    <img
                      src={
                        user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                          user?.profile_url === ""
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          : user?.profile_url
                      }
                      alt={
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                    <p>{user ? user.username : "Guest"}</p>
                  </div>
                  {settingsOpen ? (
                    <>
                      <div className="settings-options">
                        <NavLink to="/notifications">Notifications</NavLink>
                        <NavLink to="/create-report">Create a report</NavLink>
                        <NavLink to="/edit-report">My reports</NavLink>
                        <NavLink to="/upgrade">Upgrade 🚀</NavLink>
                      </div>
                      <div className="settings-overlay" onClick={toggleSettings}></div>
                    </>
                  ) : null}
                  <p onClick={toggleSettings} className="settings-toggle"><FaGear fontSize={20} /></p>
                </div>
              </div>
            </nav>
          </>
        );

      // Link to account page
      case "/profile":
        return (
          <>
            <header>
              {/* Logo section */}
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>

                {/* Nav links */}
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
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                  </NavLink>
                </nav>

                {/* Hamburger */}
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>

            {/* Navbar for mobile */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <div className="nav-links">
                <NavLink to="/notifications">Notifications</NavLink>
                <NavLink to="/create-report">Create a report</NavLink>
                <NavLink to="/edit-report">My reports</NavLink>
              </div>

              <div className="nav-footer">
                <hr />
                <div className="footer-container">
                  <div className="user-info">
                    <img
                      src={
                        user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                          user?.profile_url === ""
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          : user?.profile_url
                      }
                      alt={
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                    <p>{user ? user.username : "Guest"}</p>
                  </div>
                  {settingsOpen ? (
                    <>
                      <div className="settings-options">
                        <NavLink to="/notifications">Notifications</NavLink>
                        <NavLink to="/create-report">Create a report</NavLink>
                        <NavLink to="/edit-report">My reports</NavLink>
                        <NavLink to="/upgrade">Upgrade 🚀</NavLink>
                      </div>
                      <div className="settings-overlay" onClick={toggleSettings}></div>
                    </>
                  ) : null}
                  <p onClick={toggleSettings} className="settings-toggle"><FaGear fontSize={20} /></p>
                </div>
              </div>
            </nav>
          </>
        );

      // update report navbar
      case `/update-report/${id}`:
        return (
          <>
            <header>
              {/* Logo section */}
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>

                {/* Nav links */}
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
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                  </NavLink>
                </nav>

                {/* Hamburger */}
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>

            {/* Navbar for mobile */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <div className="nav-links">
                <NavLink to="/notifications">Notifications</NavLink>
                <NavLink to="/create-report">Create a report</NavLink>
                <NavLink to="/edit-report">My reports</NavLink>
              </div>

              <div className="nav-footer">
                <hr />
                <div className="footer-container">
                  <div className="user-info">
                    <img
                      src={
                        user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                          user?.profile_url === ""
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          : user?.profile_url
                      }
                      alt={
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                    <p>{user ? user.username : "Guest"}</p>
                  </div>
                  {settingsOpen ? (
                    <>
                      <div className="settings-options">
                        <NavLink to="/notifications">Notifications</NavLink>
                        <NavLink to="/create-report">Create a report</NavLink>
                        <NavLink to="/edit-report">My reports</NavLink>
                        <NavLink to="/upgrade">Upgrade 🚀</NavLink>
                      </div>
                      <div className="settings-overlay" onClick={toggleSettings}></div>
                    </>
                  ) : null}
                  <p onClick={toggleSettings} className="settings-toggle"><FaGear fontSize={20} /></p>
                </div>
              </div>
            </nav>
          </>
        );

      // single report page navbar
      case `/report/${id}`:
        return (
          <>
            <header>
              {/* Logo section */}
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>

                {/* Nav links */}
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
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                  </NavLink>
                </nav>

                {/* Hamburger */}
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>

            {/* Navbar for mobile */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <div className="nav-links">
                <NavLink to="/notifications">Notifications</NavLink>
                <NavLink to="/create-report">Create a report</NavLink>
                <NavLink to="/edit-report">My reports</NavLink>
              </div>

              <div className="nav-footer">
                <hr />
                <div className="footer-container">
                  <div className="user-info">
                    <img
                      src={
                        user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                          user?.profile_url === ""
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          : user?.profile_url
                      }
                      alt={
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                    <p>{user ? user.username : "Guest"}</p>
                  </div>
                  {settingsOpen ? (
                    <>
                      <div className="settings-options">
                        <NavLink to="/notifications">Notifications</NavLink>
                        <NavLink to="/create-report">Create a report</NavLink>
                        <NavLink to="/edit-report">My reports</NavLink>
                        <NavLink to="/upgrade">Upgrade 🚀</NavLink>
                      </div>
                      <div className="settings-overlay" onClick={toggleSettings}></div>
                    </>
                  ) : null}
                  <p onClick={toggleSettings} className="settings-toggle"><FaGear fontSize={20} /></p>
                </div>
              </div>
            </nav>
          </>
        );

      // Admin page navbar
      case "/admin":
        return (
          <>
            <header>
              {/* Logo section */}
              <div className="container">
                <p className="logo">
                  <NavLink to="/admin">TrustGuardianHub</NavLink>
                </p>

                {/* Nav links */}
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
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                  </NavLink>
                </nav>

                {/* Hamburger */}
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>

            {/* Navbar for mobile */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <div className="nav-links">
                <NavLink to="/notifications">Manage Users</NavLink>
                <NavLink to="/create-report">Reports</NavLink>
                <NavLink to="/edit-report">Analytics</NavLink>
              </div>

              <div className="nav-footer">
                <hr />
                <div className="footer-container">
                  <div className="user-info">
                    <img
                      src={
                        user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                          user?.profile_url === ""
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          : user?.profile_url
                      }
                      alt={
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                    <p>{user ? user.username : "Guest"}</p>
                  </div>
                  {settingsOpen ? (
                    <>
                      <div className="settings-options">
                        <NavLink to="/notifications">Notifications</NavLink>
                        <NavLink to="/create-report">Create a report</NavLink>
                        <NavLink to="/edit-report">My reports</NavLink>
                        <NavLink to="/upgrade">Upgrade 🚀</NavLink>
                      </div>
                      <div className="settings-overlay" onClick={toggleSettings}></div>
                    </>
                  ) : null}
                  <p onClick={toggleSettings} className="settings-toggle"><FaGear fontSize={20} /></p>
                </div>
              </div>
            </nav>
          </>
        );

      // Upgrade page navbar
      case "/upgrade":
        return (
          <>
            <header>
              {/* Logo section */}
              <div className="container">
                <p className="logo">
                  <NavLink to="/dashboard">TrustGuardianHub</NavLink>
                </p>

                {/* Nav links */}
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
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                  </NavLink>
                </nav>

                {/* Hamburger */}
                <button className={`hamburger ${isMobileMenuOpen ? 'is-active' : ''}`} onClick={toggleMobileMenu}>
                  <div className="bar"></div>
                </button>
              </div>
            </header>

            {/* Navbar for mobile */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'is-active' : ''}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
                Close
              </button>
              <div className="nav-links">
                <NavLink to="/notifications">Notifications</NavLink>
                <NavLink to="/create-report">Create a report</NavLink>
                <NavLink to="/edit-report">My reports</NavLink>
              </div>

              <div className="nav-footer">
                <hr />
                <div className="footer-container">
                  <div className="user-info">
                    <img
                      src={
                        user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                          user?.profile_url === ""
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          : user?.profile_url
                      }
                      alt={
                        user ? user.username : "user"
                      }
                      className="profile-image" />
                    <p>{user ? user.username : "Guest"}</p>
                  </div>
                  {settingsOpen ? (
                    <>
                      <div className="settings-options">
                        <NavLink to="/notifications">Notifications</NavLink>
                        <NavLink to="/create-report">Create a report</NavLink>
                        <NavLink to="/edit-report">My reports</NavLink>
                        <NavLink to="/upgrade">Upgrade 🚀</NavLink>
                      </div>
                      <div className="settings-overlay" onClick={toggleSettings}></div>
                    </>
                  ) : null}
                  <p onClick={toggleSettings} className="settings-toggle"><FaGear fontSize={20} /></p>
                </div>
              </div>
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
