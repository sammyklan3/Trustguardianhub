import "./toast.css";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const Toast = ({ message, duration, onClose, type }) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, duration);

        return () =>
            clearTimeout(timer);
    }, [duration, onClose]);


    return (
        <div className={`toast ${visible ? "show" : "hide"} ${type}`}>
            <div className="toast-content">
                {message}
            </div>
        </div>
    );
};

Toast.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    duration: PropTypes.number,
    onClose: PropTypes.func,
}
