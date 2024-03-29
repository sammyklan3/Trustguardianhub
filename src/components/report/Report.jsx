import "./report.css";
import PropTypes from 'prop-types';
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { NavLink } from "react-router-dom";

export const ReportItem = ({ title, image, username, profile_pic, user_id, onDelete }) => {

  const [showDialog, setShowDialog] = useState(false);

  const { user } = useContext(AuthContext);

  const toggleDialog = () => {
    setShowDialog(prevState => !prevState);
  };

  return (
    <li className="report-details">
      <div className="report-header">
        <img src={profile_pic} alt="profile" className="report-header-image" />
        <p>{username === user.username ? "You" : username}</p>
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
              <>
                <div className="overlay" onClick={toggleDialog}></div>
                <div className="dialog-box">
                  <p>Are you sure you want to delete this report?</p>
                  <div className="dialog-box-action">
                    <button onClick={onDelete}>Yes</button>
                    <button onClick={toggleDialog}>No</button>
                  </div>
                </div>
              </>
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
};
