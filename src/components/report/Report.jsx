import "./report.css";
import PropTypes from 'prop-types';
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrashFill, BsClock } from "react-icons/bs";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { NavLink } from "react-router-dom";
import { calculateTimeSincePosted } from "../../utils/timeCalc";
import { DialogBox } from "../dialogBox/DialogBox";

export const ReportItem = ({ title, image, username, profile_pic, user_id, onDelete, date, report_id }) => {

  const [showDialog, setShowDialog] = useState(false);
  const [timeSincePosted, setTimeSincePosted] = useState("");

  const { user } = useContext(AuthContext);

  const toggleDialog = () => {
    setShowDialog(prevState => !prevState);
  };

  useEffect(() => {
    // Function to calculate time since posted
    setTimeSincePosted(calculateTimeSincePosted(date));

    // Update time every minute
    const interval = setInterval(() => {
      setTimeSincePosted(calculateTimeSincePosted(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <li className="report-details">
      <div className="report-header">
        {/* Display the username and profile picture */}
        <NavLink
          to={ username === user.username ? "/profile" : `/user/${username}`}
          className="report-header-info">
          <img src={profile_pic} alt="profile" className="report-header-image" />
          <p>{username === user.username ? "You" : username}</p>
        </NavLink>

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
            <NavLink to={`/update-report/${report_id}`} className="edit-link"><FaRegEdit /></NavLink>
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
          <NavLink to={`/report/${report_id}`} className="report-open">Open</NavLink>
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
  report_id: PropTypes.string.isRequired
};
