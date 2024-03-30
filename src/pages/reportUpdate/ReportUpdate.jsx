import { useEffect, useState, useContext } from "react";
import "./reportupdate.css";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { Loader } from "../../components/loader/Loader";
import { AuthContext } from "../../context/authContext";
import { Navbar } from "../../components/Navbar/Navbar";
import { Toast } from "../../components/toast/Toast";

export const ReportUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [report, setReport] = useState({ title: "", description: "", image: null, imageUrl: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  // Add a state to track whether the button is enabled or disabled
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  console.log(isButtonEnabled);

  useEffect(() => {
    const getReport = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/reports/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReport(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
        setError("Failed to fetch report");
      }
    }
    getReport();
  }, [id, token])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value
    }));
    setIsDirty(true);
  };

  const handleImageChange = (e) => {
    setReport((prevReport) => ({
      ...prevReport,
      image: e.target.files[0],
      imageUrl: URL.createObjectURL(e.target.files[0]) // Preview selected image
    }));
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", report.title);
      formData.append("description", report.description);
      formData.append("image", report.image);

      const response = await axiosInstance.patch(`/reports/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.status === 200) {
        setShowToast(true);
        setToastType("success");
        setToastMessage(response.data.message);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      setShowToast(true);
      setToastType("error");
      setError(err.response ? err.response.data.error : "An error occurred");
      setToastMessage(err.response ? err.response.data.error : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Check if any changes have been made to the form data
  useEffect(() => {
    const isFormDirty = () => {
      return (
        report.title !== "" ||
        report.description !== "" ||
        report.image !== null
      );
    };
    setIsDirty(isFormDirty());
  }, [report]);

  // Update the useEffect hook to set the button enabled state
  useEffect(() => {
    setIsButtonEnabled(isDirty);
  }, [isDirty]);

  return (
    <div className="report-update">
      <Navbar />

      {loading ? <Loader /> : report ? (
        <div className="report-update-container">
          <h1>Update Report</h1>
          <form className="report-update-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={report.title}
              onChange={handleInputChange}
              placeholder="Enter report title"
            />
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="description"
              value={report.description}
              onChange={handleInputChange}
              placeholder="Enter report content"
            />
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {report.imageUrl && (
              <>
                <h3>Preview</h3>
                <img src={report.imageUrl} alt="Preview" className="report-image" />
              </>
            )}
            {!report.imageUrl && report.image_url && (
              <>
                <h3>Current Image</h3>
                <img src={report.image_url} alt="Report Image" className="report-image" />
              </>
            )}

            {/* // Render the button with the appropriate CSS class */}
            <button
              type="submit"
              className={`button ${isButtonEnabled ? 'enabled' : 'disabled'}`}
              disabled={!isButtonEnabled}
            >
              Save changes
            </button>

            {showToast && (
              <Toast
                message={toastMessage}
                duration={3000}
                type={toastType}
                onClose={() => setShowToast(false)}
              />
            )}
          </form>
        </div>
      ) : <p className="error-message">{error}</p>}
    </div>
  )
}
