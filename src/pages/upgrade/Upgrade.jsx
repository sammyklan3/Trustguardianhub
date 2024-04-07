import { useEffect, useState, useContext } from 'react';
import { Payment } from '../../components/payments/Payment';
import { axiosInstance } from "../../api/axiosInstance";
import { AuthContext } from '../../context/authContext';
import { Navbar } from '../../components/Navbar/Navbar';
import { Toast } from '../../components/toast/Toast';
import { PaymentLoading } from '../../components/paymentLoading/PaymentLoading';
import "./upgrade.css";
import { useNavigate } from 'react-router-dom';

export const Upgrade = () => {
    const navigate = useNavigate();
    const [showpayment, setShowPayment] = useState(false);
    const [showpaymentLoading, setShowPaymentLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    const [paymentId, setPaymentId] = useState(null); // State to hold the payment ID
    const [currentTier, setCurrentTier] = useState("free"); // State to hold the user's current package

    const { token, user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        
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

        setCurrentTier(user ? user.tier : "FREE");
    }, []);

    const submitPayment = async ({ formData }) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/stkPush", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                if (res.data.mpesaRes.ResponseCode == 0) {
                    setShowPayment(false);
                    setShowPaymentLoading(true);
                    setPaymentId(res.data.payment_id);
                } else {
                    setShowToast(true);
                    setToastType("success");
                    setToastMessage("Payment request sent successfully");
                }
            }
            setLoading(false);
        } catch (err) {
            setShowToast(true);
            console.log(err);
            setToastType("error");
            setToastMessage(err ? err.response.data.error : "An error occurred while sending payment request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upgrade-container">
            <Navbar />

            {showpayment ? (
                <Payment amount={showpayment.amount} defaultPhone={user ? user.phone : ""} onSubmit={submitPayment} loading={loading} setShowPayment={setShowPayment} paymentPurpose={showpayment.paymentPurpose} user={user} />
            ) : (
                <>
                    {showpaymentLoading ? (
                        <PaymentLoading paymentId={paymentId} setShowPaymentLoading={setShowPaymentLoading}/>
                    ) : (
                        <div className="upgrade-content">
                            <h2>Upgrade Your Account</h2>
                            <p>Choose the package that best fits your needs:</p>
                            {currentTier === "FREE" && (
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
                            {currentTier !== "FREE" && (
                                <div className="current-package">
                                    <h3>Current Package: {currentTier}</h3>
                                    {/* Display current package details here */}
                                </div>
                            )}
                            {currentTier === "FREE" && (
                                <div className="package">
                                    <h3>Basic Package</h3>
                                    <p>Unlock basic features:</p>
                                    <ul>
                                        <li>Report up to 5 scammers per month</li>
                                        <li>Access to community forums</li>
                                    </ul>
                                    <p>Price: KES 100/month</p>
                                    <button type="button" onClick={() => setShowPayment({ amount: 100, paymentPurpose: "basic_tier_package" })}>Upgrade to Basic</button>
                                </div>
                            )}
                            {currentTier !== "basic_tier_package" && (
                                <div className="package">
                                    <h3>Standard Package</h3>
                                    <p>Unlock standard features:</p>
                                    <ul>
                                        <li>Report up to 15 scammers per month</li>
                                        <li>Access to premium support</li>
                                        <li>Priority listing in scam alerts</li>
                                    </ul>
                                    <p>Price: KES 250/month</p>
                                    <button type="button" onClick={() => setShowPayment({ amount: 250, paymentPurpose: "standard_tier_package" })}>Upgrade to Standard</button>
                                </div>
                            )}
                            {currentTier !== "standard_tier_package" && (
                                <div className="package">
                                    <h3>Premium Package</h3>
                                    <p>Unlock premium features:</p>
                                    <ul>
                                        <li>Unlimited scammer reports</li>
                                        <li>Access to exclusive webinars and workshops</li>
                                        <li>Personalized fraud prevention consultation</li>
                                    </ul>
                                    <p>Price: KES 500/month</p>
                                    <button type="button" onClick={() => setShowPayment({ amount: 500, paymentPurpose: "premium_tier_package" })}>Buy Premium</button>
                                </div>
                            )}
                        </div>
                    )}
                </>
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
