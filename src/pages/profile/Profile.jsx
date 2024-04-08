import "./profile.css";
import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/authContext";
import { DialogBox } from "../../components/dialogBox/DialogBox";

export const Profile = () => {
  const { user, error, logout, deleteProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    
  }, [user, navigate]);

  const toggleDialog = () => {
    setShowDialog(prevState => !prevState);
  };

  const handleDeleteProfile = () => {
    // Close the confirmation dialog
    toggleDialog();
    // Call the deleteProfile function
    deleteProfile();
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        <div className="profile-header">
          <img
            src={
              user?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                user?.profile_url === ""
                ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                : user?.profile_url
            }
            alt="profile"
            className="profile-content-image"
          />
          <NavLink to="/edit-profile">Edit profile</NavLink>

        </div>
        {user ? (
          <div className="profile-info">
            <div className="profile-item">
              <h3 className="profile-label">Username:</h3>
              <p className="profile-value">{user.username}</p>
            </div>
            <hr />

            <div className="profile-item">
              <h3 className="profile-label">Email:</h3>
              <p className="profile-value">{user.email}</p>
            </div>
            <hr />

            <div className="profile-item">
              <h3 className="profile-label">Phone:</h3>
              <p className="profile-value">
                {user.phone ? user.phone : "No phone number added"}
              </p>
            </div>
            <hr />

            <div className="profile-item">
              <h3 className="profile-label">Address:</h3>
              <p className="profile-value">
                {user.address ? user.address : "No address added"}
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : null}
      </div>

      <div className="button-container">
        <button className="logout-btn" onClick={logout}>Logout</button>
        <button className="delete-btn" onClick={toggleDialog}>Delete Account</button>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDialog && (
        <DialogBox
          message="Are you sure you want to delete your account ?"
          onConfirm={handleDeleteProfile}
          onCancel={toggleDialog}
        />
      )}
    </div>
  )
};
