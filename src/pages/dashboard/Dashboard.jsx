import "./dashboard.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { FaBook } from "react-icons/fa";
import PropTypes from 'prop-types';

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h1>Welcome, Sammy</h1>
        <p>We&apos;re glad you&apos;re here! Below you will find all the reports you&apos;ve submitted and their current status. You can also edit and update your reports if needed.</p>
        <ul>

          <li>
            <div className="report-details">
              <FaBook />
              <div className="report-info">
                <p>Report#1: Fake Check Scam</p>
                <small>Submitted: 4/14/22</small>
              </div>
            </div>
            <button>Edit</button>
          </li>

          <li>
            <div className="report-details">
              <FaBook />
              <div className="report-info">
                <p>Report#1: Fake Check Scam</p>
                <small>Submitted: 4/14/22</small>
              </div>
            </div>
            <button>Edit</button>
          </li>

        </ul>
      </div>
    </div>
  )
}

Dashboard.propTypes = {

}

