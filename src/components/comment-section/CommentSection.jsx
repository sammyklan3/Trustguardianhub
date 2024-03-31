import "./comments.css";
import PropTypes from "prop-types";

export const CommentSection = ({ comment }) => {
    return (

        <li className="comment-item">
            <div className="comment-user">
                <img src={comment.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="user" />
                <p>{comment.username || "user"}</p>
            </div>
            <p>{comment.comment}</p>
            
        </li>
    )
}

CommentSection.propTypes = {
    comment: PropTypes.array.isRequired
}
