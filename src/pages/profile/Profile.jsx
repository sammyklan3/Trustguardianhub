import "./profile.css"; // Consider using CSS Modules for better scoping of styles
import { Navbar } from "../../components/Navbar/Navbar";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { axiosInstance } from "../../api/axiosInstance";
import { parseDate } from "../../utils/dateParser";
import { Loader } from "../../components/loader/Loader";
import { CiLocationOn, CiCalendar, CiMail, CiPhone } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

// Component to display user stats
const ProfileStats = ({ profileData }) => (
  <div className="profile-stats">
    <p><CiLocationOn />{profileData?.location}</p>
    <p><CiCalendar />Joined at {parseDate(profileData?.created_at)}</p>
    <p><CiMail />{profileData?.email}</p>
    <p><CiPhone />{profileData?.phone}</p>
    <p><span>@</span>{profileData?.username}</p>
    <p><span><FaStar color="orange" /></span>{profileData?.points} points</p>
  </div>
);

// Component to display followers and following on mobile screens
const ProfileFollowers = ({ profileData }) => (
  <div className="profile-followers">
    <p className="user-followers">
      <span><IoIosArrowDown /></span>
      <span>{profileData?.followers} {profileData && profileData.followers === 1 ? "follower" : "followers"}</span>
    </p>
    <p className="user-following">
      <span><IoIosArrowDown /></span>
      <span>{profileData?.following} following</span>
    </p>
  </div>
);

// Component to display followers and following on wide screens
const ProfileFollowersWide = ({ profileData }) => (
  <div className="profile-followers-wide">
    <p className="user-followers">
      <span><IoIosArrowDown /></span>
      <span>{profileData?.followers} {profileData && profileData.followers === 1 ? "follower" : "followers"}</span>
    </p>
    <p className="user-following">
      <span><IoIosArrowDown /></span>
      <span>{profileData?.following} following</span>
    </p>
  </div>
);
export const Profile = () => {
  const { token } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Change the title of the page
    document.title = `TrustGuardianHub - Profile`;

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfileData(response.data.data);

        // Update the title with user's name
        if (response.data.data) {
          document.title = `TrustGuardianHub - ${response.data.data.firstname} ${response.data.data.lastname}`;
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]); // Added token to dependencies

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!profileData) {
    return <h1>Profile not found</h1>;
  }

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        {/* Container for the cover and profile picture */}
        <div className="profile-header">
          {/* Cover picture */}
          <div className="profile-cover">
            <img src={profileData.cover_url} alt={profileData.username} />
          </div>
          {/* Profile picture */}
          <div className="profile-avatar">
            <img src={profileData.profile_url} alt={profileData.username} />
            <p>Edit</p>
          </div>
        </div>

        {/* Container for user details */}
        <div className="profile-details">
          <h1>{profileData.firstname} {profileData.lastname}</h1>
          <p>{profileData.bio}</p>

          {/* Display small details */}
          <ProfileStats profileData={profileData} />

          {/* Display followers and following */}
          <ProfileFollowers profileData={profileData} />
        </div>

        {/* Container for user's posts and sidebar */}
        <div className="profile-posts">
          <div className="profile-posts-container">
            <h2>Your reports</h2>
            <hr />
            <div className="profile-posts-list">
              {/* Display user's posts */}
              {profileData.reports?.length > 1 ? (
                profileData.reports.map((report) => (
                  <div key={report.id} className="profile-post">
                    <img src={report.image_url} alt={report.title} />
                    <p>{report.title}</p>
                  </div>
                ))
              ) : (
                <div className="user-empty-reports">
                  <img src="https://cdni.iconscout.com/illustration/premium/thumb/cat-is-trying-to-open-the-safe-6463185-5349466.png?f=webp" alt="empty-reports" className="empty-reports-image" />
                  <h2>You have no reports {":("}</h2>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="profile-sidebar">
            <ProfileFollowersWide profileData={profileData} />
            {/* User mini details */}
            <div className="profile-mini-details">
              <p>You have {profileData.reports?.length}reports</p>
              <p>{profileData?.ranking} ranking</p>
              <p>You are on {profileData?.tier} tier</p>
            </div>
            {/* Show pending posts */}
            <div className="profile-pending-posts">
              <h2>Pending reports</h2>
              <hr />
              {/* CHeck if the pending posts is available and if is  an array or an object */}
              {profileData.pending_reports?.length > 1 ? (
                profileData.pending_reports.map((report) => (
                  <div key={report.id} className="profile-pending-post">
                    <img src={report.image_url} alt={report.title} />
                    <p>{report.title}</p>
                  </div>
                ))
              ) : (
                <p>No pending posts</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
