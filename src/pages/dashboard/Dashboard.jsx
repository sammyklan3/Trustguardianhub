import "./dashboard.css";
import { useContext, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from "../../context/authContext";
import { axiosInstance } from "../../api/axiosInstance";
import { ReportItem } from "../../components/report/Report";
import { Login } from "../auth/Login/Login";
import { Loader } from "../../components/loader/Loader";

export const Dashboard = () => {

  const { user, token } = useContext(AuthContext);
  const [reports, setReports] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "TrustGuardianHub";

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
        console.log(responseData);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  if (!user) {
    return <Login />;

  } else {
    return (
      <div className="dashboard-container">
        <Navbar />
        {error ? (
          <div className="error">{error}</div>
        ) : loading ? (
          <Loader />
        ) : reports ? (
          <div className="dashboard-content">
            <h1>Welcome, {user ? user.username : "Guest"}</h1>
            <p>We&apos;re glad you&apos;re here! Below you will find all the reports you&apos;ve submitted and their current status. You can also edit and update your reports if needed.</p>
            <ul>
              {Array.isArray(reports) ? (
                reports.map((report, index) => (
                  <ReportItem key={index} title={report.title} description={report.description} image={report.image_url} />
                ))
              ) : (
                reports && <ReportItem title={reports.title} description={reports.description} image={reports.image_url} />
              )}
            </ul>
          </div>
        ) : (
          <div className="no-reports">No reports available</div>
        )

        }
      </div>
    )
  }
}

Dashboard.propTypes = {
  user: PropTypes.object, // Example prop types, adjust as per your actual props
  token: PropTypes.string,
};


