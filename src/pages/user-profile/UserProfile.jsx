import "./user-profile.css";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { axiosInstance } from "../../api/axiosInstance";
import { Navbar } from "../../components/Navbar/Navbar";
import { Loader } from "../../components/loader/Loader";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { parseDate } from "../../utils/dateParser";
import { parseNumberWithCommas } from "../../utils/numberUtil";
import { FaStar, FaRegThumbsUp, FaEye, FaComment, FaPlus, FaRankingStar } from "react-icons/fa6";
import { RiMessage2Line } from "react-icons/ri";

export const UserProfile = () => {
    const { username } = useParams();
    const { token } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get the searched user data
    useEffect(() => {
        // Change the title of the page
        document.title = `TrustGuardianHub | ${username}`;

        async function getUserData() {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/user/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUserData(response.data.userProfile);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            };
        };

        getUserData();
    }, [username]);

    if (loading) {
        return <Loader />
    }

    if (userData.length === 0) {
        return null;
    }

    return (
        <div className="user-profile-page">
            <Navbar />
            < div className="user-profile-container">
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
                            <h1 className="user-profile-info-name">{userData.user.fullName}</h1>

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
                            <button className="user-profile-sidebar-follow"><FaPlus />Follow</button>
                            <button className="user-profile-sidebar-message"><RiMessage2Line size={18} />Message</button>
                        </div>

                        <div className="user-profile-reports-header">
                            <h2>Reports</h2>
                            <hr />
                        </div>

                        {/* Reports section/ */}

                        {/* Render if the userData is empty */
                            !userData ? (
                                <div className="user-empty-reports">
                                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/cat-is-trying-to-open-the-safe-6463185-5349466.png?f=webp" alt="empty-reports" className="empty-reports-image" />
                                    <h2>This user has no reports :{"("}</h2>
                                </div>
                            ) : null
                        }
                        {
                            // Check if the report object is an array and exists
                            Array.isArray(userData.report) && userData ? (
                                userData.report.length > 0 ? (
                                    <div className="user-profile-reports">
                                        <div className="user-profile-reports-list">
                                            {userData.report.map((report) => (
                                                <NavLink to={`/report/${report.reportId}`} className="user-profile-report" key={report.id}>
                                                    <img src={report.imageURL} alt={report.title} className="user-profile-report-image" />
                                                    <div className="user-profile-report-info">
                                                        {/* <h3 className="user-profile-report-title">{report.title}</h3> */}
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
                                        <h2>This user has no reports :{"("}</h2>
                                    </div>
                                )

                            ) : (
                                // Render the report object
                                <NavLink to={`/report/${userData.report.reportId}`} className="user-profile-report">
                                    <img src={userData.report.imageURL} alt={userData.report.title} className="user-profile-report-image" />
                                    <div className="user-profile-report-info">
                                        {/* <h3 className="user-profile-report-title">{report.title}</h3> */}
                                        <div className="user-profile-report-stats">
                                            <p className="user-profile-report-likes"><FaRegThumbsUp />{parseNumberWithCommas(userData.report.likes)}</p>
                                            <p className="user-profile-report-views"><FaEye />{parseNumberWithCommas(userData.report.views)}</p>
                                            <p className="user-profile-report-comments"><FaComment />{parseNumberWithCommas(userData.report.comments)}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        }
                    </div>

                    {/* Sidebar */}
                    <div className="user-profile-sidebar">
                        {/* Sidebar actions buttons */}
                        <div className="user-profile-sidebar-actions">
                            <button className="user-profile-sidebar-follow"><FaPlus />Follow</button>
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
                                <p> {userData.user.ranking} <FaRankingStar color="brown" /></p>
                                <p>Ranking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
