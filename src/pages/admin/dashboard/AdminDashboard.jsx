import "./dashboard.css";
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import { FaRegUser, FaNewspaper, FaPersonCircleCheck } from "react-icons/fa6";
import { AuthContext } from "../../../context/authContext";
import { Navbar } from "../../../components/Navbar/Navbar";
import { Loader } from "../../../components/loader/Loader";

export const AdminDashboard = () => {

  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);

  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    // const getReports = async () => {
    //   setLoading(true);
    //   try {
    //     const res = await axiosInstance.get("/reports", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     setReports(res.data.data);
    //   } catch (err) {
    //     console.log(err)
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // getReports();

    // set the reports to static data for testing purposes
    setReports([
      {
        id: 1,
        title: "Report 1",
        description: "This is a test report",
        image: "https://static.vecteezy.com/system/resources/thumbnails/023/308/053/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg",
        username: "Test User",
        profile_pic: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      },
      {
        id: 2,
        title: "Report 2",
        description: "This is another test report",
        image: "https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg",
        username: "Test User 2",
        profile_pic: "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
      },
      {
        id: 3,
        title: "Report 3",
        description: "This is yet another test report",
        image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        username: "Test User 3",
      },
    ]);

    setUsers([
      {
        id: 1,
        username: "Test User 1",
        profile_pic: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      },
      {
        id: 2,
        username: "Test User 2",
        profile_pic: "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
      },
    ]);

  }, [token]); // Add dependencies

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-container-header">
        <h3>Admin Dashboard</h3>
      </div>

      {/* Container for the analytics */}
      <div className="admin-container-analytics">
        <div className="analytics-item">
          <p><FaNewspaper color="blue" /> Total Reports</p>
          <p>Reported cases: {reports.length}</p>
        </div>

        <div className="analytics-item">
          <p> <FaRegUser color="red" /> Registered users </p>
          <p>Accounts: {users.length}</p>
        </div>

        <div className="analytics-item">
          <p> <FaPersonCircleCheck color="green" /> Active sessions</p>
          <p>Online users: {users.length}</p>
        </div>
      </div>

      {/* Latest 5 registered users */}
      <div className="admin-container-latest-users">
        <div className="latest-users-header">
          <h3>Latest Registered Users</h3>
        </div>
        <ul className="latest-users-list">

          {users ? (
            Array.isArray(users) ? (
              users.map((user) => (
                <li className="latest-users-item" key={user.id}>
                  <img src={user.profile_pic} alt="profile" />
                  <p>{user.username}</p>
                </li>
              ))
            ) : (
              <div className="latest-users-item">
                <img src={users.profile_pic} alt="profile" />
                <p>{users.username}</p>
              </div>
            )
          ) : (
            <p>No users found</p>
          )}
        </ul>
      </div>

      {/* Recent reports */}
      <div className="admin-container-recent-reports">
        <div className="recent-reports-header">
          <h3>Recent Reports</h3>
        </div>
        <ul className="recent-reports-list">
          {reports ? (
            Array.isArray(reports) ? (
              reports.map((report) => (
                <li className="recent-reports-item" key={report.id}>
                  <div className="recent-reports-header">
                    <img src={report.profile_pic} alt={report.username} />
                    <p>{report.username}</p>
                  </div>
                  <div className="report-item-content">
                    <h3>{report.title}</h3>
                    <img src={report.image} alt={report.title} />
                    <p>{report.description}</p>
                  </div>
                </li>
              ))
            ) : (
              <div className="recent-reports-item">
                <h3>{reports.title}</h3>
                <p>{reports.description}</p>
              </div>
            )
          ) : (
            <p>No reports found</p>
          )}
        </ul>
      </div>
    </div>
  )
}
