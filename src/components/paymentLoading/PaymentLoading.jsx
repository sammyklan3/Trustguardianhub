import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types';
import "./paymentLoading.css";
import { axiosInstance } from '../../api/axiosInstance';
import { AuthContext } from '../../context/authContext';
import { HashLoader } from 'react-spinners';

export const PaymentLoading = ({ paymentId, setShowPaymentLoading }) => {
    const [status, setStatus] = useState(null);
    const { user, token } = useContext(AuthContext);

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const response = await axiosInstance.get(`/confirmPayment/${paymentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStatus(response.data.status);
                console.log(response);
            } catch (error) {
                console.error("Error checking payment status:", error);
                setShowPaymentLoading(false);
            }
        };

        const intervalId = setInterval(checkPaymentStatus, 5000); // Check every 5 seconds

        return () => clearInterval(intervalId);
    }, [paymentId]);


    return (
        <div className="payment-loading-container">
            {status === "PENDING" ? (
                <>
                    <HashLoader color="#36d7b7" />
                    <h3>Payment is <span>{status}</span></h3>
                </>
            ) : status === "CONFIRMED" ? (
                <div className="payment-success">
                    <h2>Payment Successful</h2>
                    <p>Thank you for your payment. Your account has been upgraded.</p>
                    {/* {setShowPaymentLoading(false)} */}
                </div>
            ) : status === "FAILED" ? (
                <div className="payment-failed">
                    <h2>Payment Failed</h2>
                    <p>Sorry, your payment was not successful. Please try again.</p>
                    {/* {setShowPaymentLoading(false)} */}
                </div>
            ) : (
                <>
                    <HashLoader color="#36d7b7" />
                    <h3>Please wait as we are retrieving details</h3>
                </>
            )
            }
        </div>
    )
}

PaymentLoading.propTypes = {
    paymentId: PropTypes.string.isRequired,
    setShowPaymentLoading: PropTypes.func.isRequired
}
