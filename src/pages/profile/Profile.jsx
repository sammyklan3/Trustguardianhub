import "./profile.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/authContext";

export const Profile = () => {
  const { user, error, logout, deleteProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDeleteProfile = () => {
    // Close the confirmation dialog
    closeDeleteConfirmation();
    // Call the deleteProfile function
    deleteProfile();
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        <div className="profile-header">
          <h1>Profile</h1>
          <img
            src={
              user?.profile_url === "http://localhost:3000/public/null"
                ? "https://via.placeholder.com/150"
                : user?.profile_url
            }
            alt="profile"
            className="profile-image"
          />
        </div>
        <div className="profile-info">
          {user ? (
            <div>
              <div className="profile-item">
                <p className="profile-label">Name:</p>
                <p className="profile-value">{user.username}</p>
              </div>
              <div className="profile-item">
                <p className="profile-label">Email:</p>
                <p className="profile-value">{user.email}</p>
              </div>
              <div className="profile-item">
                <p className="profile-label">Phone:</p>
                <p className="profile-value">
                  {user.phone ? user.phone : "No phone number added"}
                </p>
              </div>
              <div className="profile-item">
                <p className="profile-label">Address:</p>
                <p className="profile-value">
                  {user.address ? user.address : "No address added"}
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : null}
        </div>
      </div>

      <div className="button-container">
        <button className="logout-btn" onClick={logout}>Logout</button>
        <button className="delete-btn" onClick={openDeleteConfirmation}>Delete Profile</button>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete your profile?</p>
          <div className="confirmation-buttons">
            <button onClick={handleDeleteProfile}>Yes, Delete</button>
            <button onClick={closeDeleteConfirmation}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
};
