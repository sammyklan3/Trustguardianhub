import { useEffect, useState, useContext } from 'react';
import { Payment } from '../../components/payments/Payment';
import { axiosInstance } from "../../api/axiosInstance";
import { AuthContext } from '../../context/authContext';
import { Navbar } from '../../components/Navbar/Navbar';
import { Toast } from '../../components/toast/Toast';
import "./upgrade.css";

export const Upgrade = () => {
    const [showpayment, setShowPayment] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const { token, user } = useContext(AuthContext);

    const submitPayment = async ({ amount, phone }) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/stkPush", {
                amount,
                phone
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                setShowToast(true);
                setToastType("success");
                setToastMessage("Payment request sent successfully");
            }
            setLoading(false);
        } catch (err) {
            setShowToast(true);
            setToastType("error");
            setToastMessage(err.response ? err.response.data.error : "An error occurred while sending payment request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upgrade-container">
            <Navbar />
            {showpayment ? <Payment amount={100} defaultPhone="254712865645" onSubmit={submitPayment} loading={loading} setShowPayment={setShowPayment} /> : (
                <button type="button" onClick={() => setShowPayment(true)}>Pay</button>
            )}
            {showToast && (
                <Toast
                    message={toastMessage}
                    duration={3000}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}

        </div>
    )
}
