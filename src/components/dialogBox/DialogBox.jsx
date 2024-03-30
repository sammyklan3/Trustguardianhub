import "./dialogbox.css";
import PropTypes from 'prop-types';

export const DialogBox = ({ message, onConfirm, onCancel }) => {
  return (
    <>
      <div className="overlay" onClick={onCancel}></div>
      <div className="dialog-box">
        <p>{message}</p>
        <div className="dialog-box-action">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </>
  );
};

DialogBox.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
