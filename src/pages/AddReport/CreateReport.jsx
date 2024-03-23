import "./create.css";
import { useState, useContext, useEffect } from 'react';
import { Navbar } from "../../components/Navbar/Navbar";
import { Toast } from "../../components/toast/Toast";
import { axiosInstance } from "../../api/axiosInstance";
import { AuthContext } from "../../context/authContext";

export const CreateReport = () => {
  const { token, user } = useContext(AuthContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "TrustGuardianHub | Create Report";
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: undefined,
    userId: user ? user.userId : null,
  });

  useEffect(() => {
    // Update userId in formData when user context changes
    setFormData(prevState => ({
      ...prevState,
      userId: user ? user.userId : null,
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: imageFile
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setShowToast(true);
        setToastType("success");
        setToastMessage(response.data.message);
      }

    } catch (error) {
      console.error(error);
      setShowToast(true);
      setToastType("error");
      setToastMessage(error.response ? error.response.data.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="createreport-container">
      <Navbar />
      <form onSubmit={handleSubmit} className="report-form" encType="multipart/form-data">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <div className="loader"></div> : "Login"}
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
  );
};
