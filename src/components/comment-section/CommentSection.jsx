import "./comments.css";
import PropTypes from "prop-types";
import { BsFillTrashFill } from "react-icons/bs";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { axiosInstance } from "../../api/axiosInstance";

export const CommentSection = ({ comment, onDelete }) => {

    const { user, token } = useContext(AuthContext);

    const handleDelete = async () => {
        try {
            // Send a DELETE request to your backend API endpoint
            await axiosInstance.delete(`/comments/${comment.comment_id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // You need to define 'token' here
                }
            });
            // Call the onDelete callback passed from the parent component
            onDelete(comment.comment_id);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (

        <li className="comment-item">
            <div className="comment-user">
                <div className="comment-avatar">
                    <img src={
                        comment?.profile_url === import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/public/null` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/public/null` ||
                            comment?.profile_url === ""
                            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                            : comment?.profile_url
                    } alt={comment.username} />
                    <p>{comment.username || "user"}</p>
                </div>
                {user?.user_id === comment.user_id && <button className="delete-comment" onClick={handleDelete}><BsFillTrashFill /></button>}
            </div>
            <p>{comment.comment}</p>

        </li>
    )
}

CommentSection.propTypes = {
    comment: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
}
