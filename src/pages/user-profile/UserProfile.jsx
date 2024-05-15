import "./user-profile.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import copy from "copy-to-clipboard";
import { AuthContext } from "../../context/authContext";
import { axiosInstance } from "../../api/axiosInstance";
import { Navbar } from "../../components/Navbar/Navbar";
import { Loader } from "../../components/loader/Loader";
import { CiLocationOn, CiCalendar, CiCircleCheck } from "react-icons/ci";
import { FaStar, FaRegThumbsUp, FaEye, FaComment, FaPlus, FaRankingStar, FaShare } from "react-icons/fa6";
import { RiMessage2Line } from "react-icons/ri";
import { RingLoader } from "react-spinners";
import { Toast } from "../../components/toast/Toast";
import { parseDate } from "../../utils/dateParser";
import { parseNumberWithCommas } from "../../utils/numberUtil";

export const UserProfile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const { token, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    // Function for copying the current URL to the clipboard
    const copyURL = () => {
        copy(window.location.href);
        setShowToast(true);
        setToastType("success");
        setToastMessage(<p><CiCircleCheck size={20} />URL copied to clipboard</p>);
    };

    // Function to follow a user
    const followUser = async () => {
        try {
            setFollowLoading(true);
            const response = await axiosInstance.post(`/follow/${userData.user.userId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                setIsFollowing(true);
                setShowToast(true);
                setToastType("success");
                setToastMessage(`You are now following ${username}`);
            }
        } catch (error) {
            console.error("Error following user", error);
        } finally {
            setFollowLoading(false);
        }
    };

    // Function to unfollow a user
    const unfollowUser = async () => {
        try {
            setFollowLoading(true);
            const response = await axiosInstance.delete(`/unfollow/${userData.user.userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                setIsFollowing(false);
                setShowToast(true);
                setToastType("success");
                setToastMessage(`You are no longer following ${username}`);
            }
        } catch (error) {
            console.error("Error unfollowing user", error);
        } finally {
            setFollowLoading(false);
        }
    };

    // Get the searched user data
    useEffect(() => {
        document.title = `TrustGuardianHub | ${username}`;

        if (username === user?.username) {
            navigate("/profile");
        }

        const getUserData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/user/${username}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data.userProfile);
                setIsFollowing(response.data.userProfile.user.checkFollow);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, [username, user?.username, token, navigate]);

    if (loading) {
        return <Loader />;
    }

    // Render error element if the user does not exist
    if (!userData) {
        return (
            <div className="user-profile-page">
                <Navbar />
                <div className="user-error-reports">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/cat-is-trying-to-open-the-safe-6463185-5349466.png?f=webp" alt="empty-reports" className="empty-reports-image" />
                    <h2>User '{username}' does not exist {":("}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="user-profile-page">
            <Navbar />
            <div className="user-profile-container">
                {/* Display the cover and profile picture of the user */}
                <div className="user-profile-header">
                    <img src={userData.user.coverPicture} alt="cover" className="user-profile-cover" />
                    <img src={userData.user.profilePicture} alt="profile" className="user-profile-image" />
                </div>

                {/* Contain the main content and side bar */}
                <div className="user-profile-content">
                    <div className="user-profile-content-main">
                        {/* User info */}
                        <div className="user-profile-info">
                            <div className="user-profile-info-name">
                                <h1>{userData.user.fullName}</h1> <button onClick={copyURL}><FaShare color="gray" size={20} /></button>
                            </div>
                            <p className="user-profile-info-bio">{userData.user.bio}</p>
                            <div className="user-profile-info-details">
                                <p className="user-profile-info-username">@{userData.user.username}</p>
                                <p className="user-profile-info-location"><CiLocationOn />{userData.user.location}</p>
                                <p className="user-profile-info-joined"><CiCalendar />Joined {parseDate(userData.user.dateJoined)}</p>
                                <p className="user-profile-info-points"><FaStar color="orange" />{userData.user.points} points</p>
                            </div>
                        </div>

                        {/* Mobile actions buttons */}
                        <div className="user-profile-mobile-actions">
                            {isFollowing ? (
                                <button className="user-profile-sidebar-following" onClick={unfollowUser} disabled={followLoading}>
                                    {followLoading ? <><RingLoader size={15} color="white"/> Processing</> : <><CiCircleCheck size={15}/> Following</>}
                                </button>
                            ) : (
                                <button className="user-profile-sidebar-follow" onClick={followUser} disabled={followLoading}>
                                    {followLoading ? <><RingLoader size={15} color="white"/> Processing</> : <><FaPlus /> Follow</>}
                                </button>
                            )}
                            <button className="user-profile-sidebar-message"><RiMessage2Line size={18} />Message</button>
                        </div>

                        <div className="user-profile-reports-header">
                            <h2>Reports</h2>
                            <hr />
                        </div>

                        {/* Reports section */}
                        {Array.isArray(userData.report) && userData.report.length > 0 ? (
                            <div className="user-profile-reports">
                                <div className="user-profile-reports-list">
                                    {userData.report.map((report) => (
                                        <NavLink to={`/report/${report.reportId}`} className="user-profile-report" key={report.id}>
                                            <img src={report.imageURL} alt={report.title} className="user-profile-report-image" />
                                            <div className="user-profile-report-info">
                                                <div className="user-profile-report-stats">
                                                    <p className="user-profile-report-likes"><FaRegThumbsUp />{parseNumberWithCommas(report.likes)}</p>
                                                    <p className="user-profile-report-views"><FaEye />{parseNumberWithCommas(report.views)}</p>
                                                    <p className="user-profile-report-comments"><FaComment />{parseNumberWithCommas(report.comments)}</p>
                                                </div>
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="user-empty-reports">
                                <img src="https://cdni.iconscout.com/illustration/premium/thumb/cat-is-trying-to-open-the-safe-6463185-5349466.png?f=webp" alt="empty-reports" className="empty-reports-image" />
                                <h2>This user has no reports {":("}</h2>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="user-profile-sidebar">
                        {/* Sidebar actions buttons */}
                        <div className="user-profile-sidebar-actions">
                            {isFollowing ? (
                                <button className="user-profile-sidebar-following" onClick={unfollowUser} disabled={followLoading}>
                                    {followLoading ? <><RingLoader size={15} color="white"/> Processing</> : <><CiCircleCheck size={15}/> Following</>}
                                </button>
                            ) : (
                                <button className="user-profile-sidebar-follow" onClick={followUser} disabled={followLoading}>
                                    {followLoading ? <><RingLoader size={15} color="white"/> Processing</> : <><FaPlus /> Follow</>}
                                </button>
                            )}
                            <button className="user-profile-sidebar-message"><RiMessage2Line size={18} />Message</button>
                        </div>

                        {/* User summary details */}
                        <div className="user-profile-sidebar-summary">
                            {/* Number of reported cases */}
                            <div className="user-profile-sidebar-summary-item">
                                <p>{userData.report.length}</p>
                                <p>Reported cases</p>
                            </div>
                            {/* Rankings */}
                            <div className="user-profile-sidebar-summary-item">
                                <p>{userData.user.ranking} <FaRankingStar color="brown" /></p>
                                <p>Ranking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <Toast
                    message={toastMessage}
                    duration={3000}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};