import "./dashboard.css";
import { useContext, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from "../../context/authContext";
import { axiosInstance } from "../../api/axiosInstance";
import { ReportItem } from "../../components/report/Report";
import { Loader } from "../../components/loader/Loader";
import { BsFillFilePlusFill } from "react-icons/bs";
import { Toast } from "../../components/toast/Toast";

export const Dashboard = () => {

  const { user, token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "TrustGuardianHub";

    if (!user) {
      navigate("/login");
    }

    // Fetch reports
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let responseData = response.data;

        // Check if responseData is an object and convert it to an array
        if (typeof responseData === "object" && !Array.isArray(responseData)) {
          responseData = Object.values(responseData);
        }

        setReports(responseData[1]);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleDelete = async (reportId) => {
    try {
      const response = await axiosInstance.delete(`/reports/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setShowToast(true);
        setToastType("success");
        setToastMessage(response.data.message);
        // Update the local state to remove the deleted report
        setReports(reports.filter(report => report.report_id !== reportId));
      }
    } catch (error) {
      setShowToast(true);
      setToastType("error");
      setToastMessage(error.response ? error.response.data.error : "An error occurred");
    }
  };


  return (
    <div className="dashboard-container">
      <Navbar />

      {error ? (
        <div className="error">{error}</div>
      ) : loading ? (
        <Loader />
      ) : reports ? (
        <div className="dashboard-content">
          <h1>Discover reports 🚀</h1>
          <hr />
          {/* <p>We&apos;re glad you&apos;re here! Below you will find all the reports you&apos;ve submitted and their current status. You can also edit and update your reports if needed.</p> */}
          <ul>
            {Array.isArray(reports) ? (
              reports.map((report, index) => (
                <ReportItem
                  key={index}
                  title={report.title}
                  description={report.description}
                  image={report.image_url}
                  username={report.username}
                  profile_pic={report.profile_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                  user_id={report.user_id}
                  report_id={report.report_id}
                  date={report.created_at}
                  onDelete={() => handleDelete(report.report_id)} // Pass onDelete callback
                />
              ))
            ) : (
              reports && <ReportItem
                title={reports.title}
                description={reports.description}
                image={reports.image_url}
                username={reports.username}
                profile_pic={reports.profile_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                user_id={reports.user_id}
                report_id={reports.report_id}
                date={reports.created_at}
                onDelete={() => handleDelete(reports.report_id)} // Pass onDelete callback
              />
            )}
          </ul>
        </div>
      ) : (
        <>
          <div className="dashboard-header-cont">
            <div className="dashboard-header-text">
              <h3>Create a report</h3>
              <p>Submit a report to TrustGuardianHub and we will take care of the rest.</p>
            </div>
            <NavLink to="/create-report" className="btn">Create Report</NavLink>
          </div>
          <div className="no-reports">No reports available</div>
        </>
      )
    }

      {showToast && (
        <Toast
          message={toastMessage}
          duration={3000}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

    </div>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object, // Example prop types, adjust as per your actual props
  token: PropTypes.string,
};

