import { AuthContext } from "../../../context/authContext";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from "react";

export const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
        navigate("/login");
    })

}
