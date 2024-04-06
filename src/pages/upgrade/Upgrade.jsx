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
    const [currentTier, setCurrentTier] = useState("free"); // State to hold the current user's tier

    const { token, user } = useContext(AuthContext);

    useEffect(() => {
        // You may fetch the user's current package from the server and update the currentTier state
        // Example: 
        // axiosInstance.get("/user/package", {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        // .then(response => {
        //     setCurrentTier(response.data.package);
        // })
        // .catch(error => {
        //     console.error("Error fetching user package:", error);
        // });
    }, []);

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

            {showpayment ? (
                <Payment amount={showpayment.amount} defaultPhone="254712865645" onSubmit={submitPayment} loading={loading} setShowPayment={setShowPayment} />
            ) :
                <div className="upgrade-content">
                    <h2>Upgrade Your Account</h2>
                    <p>Choose the package that best fits your needs:</p>
                    {currentTier === "free" && (
                        <div className="package">
                            <h3>Free Package</h3>
                            <p>Free features:</p>
                            <ul>
                                <li>Report up to 5 scammers per month</li>
                                <li>Access to community forums</li>
                            </ul>
                            <p>Price: Free</p>
                        </div>
                    )}
                    {currentTier !== "free" && (
                        <div className="current-package">
                            <h3>Current Package: {currentTier}</h3>
                            {/* Display current package details here */}
                        </div>
                    )}
                    {currentTier === "free" && (
                        <div className="package">
                            <h3>Basic Package</h3>
                            <p>Unlock basic features:</p>
                            <ul>
                                <li>Report up to 5 scammers per month</li>
                                <li>Access to community forums</li>
                            </ul>
                            <p>Price: KES 100/month</p>
                            <button type="button" onClick={() => setShowPayment({ amount: 100 })}>Upgrade to Basic</button>
                        </div>
                    )}
                    {currentTier !== "basic" && (
                        <div className="package">
                            <h3>Standard Package</h3>
                            <p>Unlock standard features:</p>
                            <ul>
                                <li>Report up to 15 scammers per month</li>
                                <li>Access to premium support</li>
                                <li>Priority listing in scam alerts</li>
                            </ul>
                            <p>Price: KES 250/month</p>
                            <button type="button" onClick={() => setShowPayment({ amount: 250 })}>Upgrade to Standard</button>
                        </div>
                    )}
                    {currentTier !== "standard" && (
                        <div className="package">
                            <h3>Premium Package</h3>
                            <p>Unlock premium features:</p>
                            <ul>
                                <li>Unlimited scammer reports</li>
                                <li>Access to exclusive webinars and workshops</li>
                                <li>Personalized fraud prevention consultation</li>
                            </ul>
                            <p>Price: KES 500/month</p>
                            <button type="button" onClick={() => setShowPayment({ amount: 500 })}>Buy Premium</button>
                        </div>
                    )}
                </div>
            }
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
