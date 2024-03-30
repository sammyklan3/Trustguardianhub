import "./comments.css";
import PropTypes from "prop-types";

export const CommentSection = (comments) => {
    return (

        <li className="comment-item">
            <p>{comments.comment}</p>
        </li>
    )
}

CommentSection.propTypes = {
    comments: PropTypes.array.isRequired
}
