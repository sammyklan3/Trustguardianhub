import "./report.css";
import PropTypes from 'prop-types';
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrashFill, BsClock } from "react-icons/bs";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { NavLink } from "react-router-dom";
import { DialogBox } from "../dialogBox/DialogBox";

export const ReportItem = ({ title, image, username, profile_pic, user_id, onDelete, date }) => {

  const [showDialog, setShowDialog] = useState(false);
  const [timeSincePosted, setTimeSincePosted] = useState("");

  const { user } = useContext(AuthContext);

  const toggleDialog = () => {
    setShowDialog(prevState => !prevState);
  };

  useEffect(() => {
    // Function to calculate time since posted
    const calculateTimeSincePosted = () => {
      const currentDate = new Date();
      const postedDate = new Date(date);
      const timeDifference = currentDate - postedDate;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);

      if (weeks > 0) {
        setTimeSincePosted(`${weeks}w ago`);
      } else if (days > 0) {
        setTimeSincePosted(`${days}d ago`);
      } else if (hours > 0) {
        setTimeSincePosted(`${hours}h ago`);
      } else if (minutes > 0) {
        setTimeSincePosted(`${minutes}m ago`);
      } else {
        setTimeSincePosted(`Posted now`);
      }
    };

    calculateTimeSincePosted();

    // Update time every minute
    const interval = setInterval(() => {
      calculateTimeSincePosted();
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <li className="report-details">
      <div className="report-header">
        <div className="report-header-info">
          <img src={profile_pic} alt="profile" className="report-header-image" />
          <p>{username === user.username ? "You" : username}</p>
        </div>

        {/* Display the time */}
        <div className="time-info">
          <p><BsClock /></p>
          <p>{timeSincePosted}</p>
        </div>
      </div>

      <div className="report-info">
        <h3>{title}</h3>
        <img src={image} alt={title} className="report-info-image" />
      </div>

      <div className="report-actions">
        {user.user_id === user_id ? (
          <>
            <NavLink to={`/report/${user_id}`} className="edit-link"><FaRegEdit /></NavLink>
            <button className="delete-link" onClick={toggleDialog}><BsFillTrashFill /></button>

            {showDialog && (
              <DialogBox
                message="Are you sure you want to delete this report?"
                onConfirm={onDelete}
                onCancel={toggleDialog}
              />
            )}
            
          </>
        ) : (
          <NavLink to={`/report/${user_id}`} className="report-open">Open</NavLink>
        )}
      </div>
    </li>
  );
};

ReportItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profile_pic: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};
