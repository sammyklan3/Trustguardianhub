import "./profile.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { axiosInstance } from "../../api/axiosInstance";
import { Loader } from "../../components/loader/Loader";

export const Profile = () => {

  const { token } = useContext(AuthContext);
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get the user data from the API
  useEffect(()=> {
    // Change the title of the page
    document.title = `TrustGuardianHub | Profile`;

    const fetchProfileData = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(response.data);

        setProfileData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="profile-container">
      <Navbar />
      <p>Profile page</p>
    </div>
  )
}
