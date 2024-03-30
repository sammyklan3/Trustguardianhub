import "./reportpage.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Loader } from "../../components/loader/Loader";
import { axiosInstance } from "../../api/axiosInstance";
import { AuthContext } from "../../context/authContext";
import { CommentSection } from "../../components/comment-section/CommentSection";

export const ReportPage = () => {

    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [report, setReport] = useState({});
    const [loading, setLoading] = useState(false);

    console.log(report);

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
    }, [id, token])

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
                        <div className="report-page-description">
                            <h3>Description</h3>
                            <p>{report.description}</p>
                        </div>
                        <ul className="comment-section">
                            {report.comments ? report.comments.map((comment) => (
                                <CommentSection key={comment.id} comment={comment} />
                            )) : (
                                <p>No comments</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
