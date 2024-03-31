import "./reportpage.css";
import { useEffect, useState, useContext } from "react";
import { BsChat, BsHandThumbsUp, BsBookmark } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Loader } from "../../components/loader/Loader";
import { axiosInstance } from "../../api/axiosInstance";
import { AuthContext } from "../../context/authContext";
import { CommentSection } from "../../components/comment-section/CommentSection";

export const ReportPage = () => {

    const { id } = useParams();
    const { token, user } = useContext(AuthContext);
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [commetLoading, setCommentLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    console.log(report);

    // Storing form data
    const [formData, setFormData] = useState({
        comment: "",
        userId: ""
    });

    const commentsToggle = () => {
        setIsOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get(`/reports/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                });
                setReport(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchReport();
    }, [ id, token])

    useEffect(() => {
        // Update userId in formData when user context changes
        setFormData(prevState => ({
            ...prevState,
            userId: user ? user.user_id : null,
        }));
    }, [user]);

    let commentsArray;
    if (Array.isArray(report.comments)) {
        // If report.comments is already an array, use it directly
        commentsArray = report.comments;
    } else if (typeof report.comments === 'object' && report.comments !== null) {
        // If report.comments is an object, convert it to an array
        commentsArray = Object.values(report.comments);
    } else {
        // Handle other cases, like report.comments being undefined or null
        commentsArray = [];
    }

    // Function for handling change in the form state
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setCommentLoading(true);

            const response = await axiosInstance.post(`/comments/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {

                console.log(response.data.data);

                setReport({
                    ...report,
                    comments: [...report.comments, response.data.data]
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCommentLoading(false);
            setFormData({ comment: "" });
        }
    }

    const handleDeleteComment = (commentId) => {
        // Filter out the deleted comment from report.comments
        const updatedComments = report.comments.filter(comment => comment.comment_id !== commentId);
        // Update the state to reflect the changes
        setReport(prevReport => ({
            ...prevReport,
            comments: updatedComments
        }));
    };

    return (
        <div className="report-page-container">
            <Navbar />
            <div className="report-page-content">
                {loading ? <Loader /> : (
                    <div className="report-page-details">
                        <div className="report-page-header">
                            <img src={
                                report?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                                    report?.profile_url === ""
                                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                    : report?.profile_url
                            } alt="profile" />
                            <p>{report.username}</p>
                        </div>
                        <h2>{report.title}</h2>
                        <div className="report-page-image">
                            <img src={report.image_url} alt="report" />
                        </div>
                        <div className="report-page-users">
                            <div>
                                <p onClick={commentsToggle}><BsChat /> {commentsArray.length}</p>
                                <p><BsHandThumbsUp /> {report.likes}</p>
                            </div>
                            <p><BsBookmark /></p>
                        </div>
                        {commentsArray.length === 0 ? (
                            <p className="add-comment" onClick={commentsToggle}>Be the first to comment 🎉</p>
                        ) : null}
                        <div className="report-page-description">
                            <h3>More</h3>
                            <p>{report.description}</p>
                        </div>
                        {isOpen ? (
                            <>
                                <div className="comments-overlay" onClick={commentsToggle}></div>
                                <div className={"comment-container " + (isOpen ? 'open slide-in' : '')}>
                                    <div className="bar"></div>
                                    <div className="comment-list">
                                        <ul className="comment-section">
                                            {commentsArray.length > 0 ? (
                                                commentsArray
                                                    // Sort comments by timestamp (assuming each comment has a 'timestamp' property)
                                                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                                    .map((comment) => (
                                                        <CommentSection
                                                            key={comment.comment_id}
                                                            comment={comment}
                                                            onDelete={handleDeleteComment}
                                                        />
                                                    ))
                                            ) : (
                                                <p className="empty-comments">No comments</p>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="form-container">
                                        <div className="comment-form">
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="text"
                                                    placeholder="Add a comment"
                                                    name="comment"
                                                    value={formData.comment}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <button type="submit" disabled={commetLoading}>
                                                    {commetLoading ? "Sending..." : (
                                                        <FaPaperPlane />
                                                    )}
                                                </button>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}

                    </div>
                )}
            </div>
        </div>
    )
}
