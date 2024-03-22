import "./report.css";
import { FaBook } from "react-icons/fa";
import PropTypes from 'prop-types';


export const ReportItem = ({ title, description, image }) => {
  return (
    <li>
      <div className="report-details">
        <FaBook />
        <div className="report-info">
          <p>Title: {title}</p>
          <p>Description: {description}</p>
          {/* <img src={image} alt={title}/> */}
        </div>
      </div>
      <button>Edit</button>
    </li>
  )
}

ReportItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
