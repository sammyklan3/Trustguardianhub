import "./user-profile.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { axiosInstance } from "../../api/axiosInstance";
import { Navbar } from "../../components/Navbar/Navbar";
import { Loader } from "../../components/loader/Loader";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
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

        // async function getUserData() {
        //     try {
        //      setLoading(true);
        //         const response = await axiosInstance.get(`/user/${username}`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             }
        //         });
        //         console.log(response.data);
        //     } catch (error) {
        //         console.error('Error fetching user data:', error);
        //     } finally {
        //         setLoading(false);
        //      };
        // };

        // getUserData();

        setUserData({
            userId: 1,
            fullName: "Lin Fang (林芳)",
            username: "naomi",
            email: "johndoe@gmail.com",
            bio: "I am a software developer",
            location: "Seoul, China",
            dateJoined: "April 2021",
            ranking: "Gold",
            points: 50,
            profilePicture: "https://play-lh.googleusercontent.com/LeX880ebGwSM8Ai_zukSE83vLsyUEUePcPVsMJr2p8H3TUYwNg-2J_dVMdaVhfv1cHg",
            coverPicture: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZWJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
            reports: [{
                id: 1,
                title: "Report 1",
                description: "This is a report description",
                imageURL: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
                likes: 10721,
                views: 100000,
                comments: 1200
            },
            {
                id: 2,
                title: "Report 2",
                description: "This is a report description",
                imageURL: "https://img.freepik.com/free-photo/freshness-beauty-nature-wet-drops-generated-by-ai_188544-42230.jpg",
                likes: 200,
                views: 1000,
                comments: 50
            },
            {
                id: 3,
                title: "Report 3",
                description: "This is a report description",
                imageURL: "https://img.freepik.com/free-photo/abstract-background-green-leaves_1048-2149.jpg?size=626&ext=jpg",
                likes: 20,
                views: 200,
                comments: 10
            },
            {
                id: 4,
                title: "Report 4",
                description: "This is a report description",
                imageURL: "https://img.freepik.com/free-photo/close-up-leaves_1150-15144.jpg?size=626&ext=jpg",
                likes: 30,
                views: 300,
                comments: 15
            }
            ]
        });
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
                    <img src={userData.coverPicture} alt="cover" className="user-profile-cover" />
                    <img src={userData.profilePicture} alt="profile" className="user-profile-image" />
                </div>


                {/* Contain the main content and side bar */}
                <div className="user-profile-content">

                    <div className="user-profile-content-main">

                        {/* User info */}
                        <div className="user-profile-info">
                            <h1 className="user-profile-info-name">{userData.fullName}</h1>
                            
                            <p className="user-profile-info-bio">{userData.bio}</p>
                            <div className="user-profile-info-details">
                                <p className="user-profile-info-username">@{username}</p>
                                <p className="user-profile-info-location"><CiLocationOn />{userData.location}</p>
                                <p className="user-profile-info-joined"><CiCalendar />Joined {userData.dateJoined}</p>
                                <p className="user-profile-info-points"><FaStar color="orange" />{userData.points} points</p>
                            </div>
                        </div>
                        {/* Mobile actions buttons */}
                        <div className="user-profile-mobile-actions">
                                <button className="user-profile-sidebar-follow"><FaPlus />Follow</button>
                                <button className="user-profile-sidebar-message"><RiMessage2Line size={18} />Message</button>
                            </div>

                        {/* Reports section/ */}
                        {
                            userData.reports.length > 0 ? (
                                <div className="user-profile-reports">
                                    <h2>Reports</h2>
                                    <hr />
                                    <div className="user-profile-reports-list">
                                        {userData.reports.map((report) => (
                                            <div className="user-profile-report" key={report.id}>
                                                <img src={report.imageURL} alt={report.title} className="user-profile-report-image" />
                                                <div className="user-profile-report-info">
                                                    {/* <h3 className="user-profile-report-title">{report.title}</h3> */}
                                                    <div className="user-profile-report-stats">
                                                        <p className="user-profile-report-likes"><FaRegThumbsUp />{parseNumberWithCommas(report.likes)}</p>
                                                        <p className="user-profile-report-views"><FaEye />{parseNumberWithCommas(report.views)}</p>
                                                        <p className="user-profile-report-comments"><FaComment />{parseNumberWithCommas(report.comments)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="user-empty-reports">
                                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/cat-is-trying-to-open-the-safe-6463185-5349466.png?f=webp" alt="empty-reports" className="empty-reports-image" />
                                    <h2>This user has no reports :{"("}</h2>
                                </div>
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
                                <p>{userData.reports.length}</p>
                                <p>Reported cases</p>
                            </div>
                            {/* Rankings */}
                            <div className="user-profile-sidebar-summary-item">
                                <p> {userData.ranking} <FaRankingStar color="brown" /></p>
                                <p>Ranking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
