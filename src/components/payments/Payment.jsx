import { useState } from 'react';
import Proptype from 'prop-types';
import { FaShieldHalved } from "react-icons/fa6";
import { Toast } from '../toast/Toast';
import "./payment.css";

export const Payment = ({ amount, defaultPhone, onSubmit, loading, setShowPayment }) => {
    const [phone, setPhone] = useState(defaultPhone);
    const [phoneError, setPhoneError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState("");

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);
        if (!/^254\d{9}$/.test(value)) {
            setPhoneError("Phone number must start with 254 and have 12 digits.");
        } else {
            setPhoneError(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!phoneError) {
            onSubmit({ amount, phone });
        } else {
            setShowToast(true);
            setToastType("error");
            setToastMessage(phoneError);
        }
    };

    return (
        <div className="payment-container">
            <form className="payment-form" onSubmit={handleSubmit}>
                <h2>Make a Payment via <span>MPESA</span></h2>
                <hr />
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        value={amount}
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter phone number"
                        className={phoneError ? "error-border" : null}
                    />
                    {/* {phoneError && <p className="error">{phoneError}</p>} */}
                </div>
                <button type="submit" className="submitBtn" disabled={loading}>{loading ? "Loading.." : "Send"}</button>
                <button type="button" className="cancelBtn" onClick={() => setShowPayment(false)}>Cancel</button>
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

Payment.propTypes = {
    amount: Proptype.number.isRequired,
    defaultPhone: Proptype.string.isRequired,
    onSubmit: Proptype.func.isRequired,
    loading: Proptype.bool.isRequired,
    setShowPayment: Proptype.bool.isRequired,
};