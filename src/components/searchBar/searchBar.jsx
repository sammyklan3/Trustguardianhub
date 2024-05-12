import "./searchbar.css";
import { BsSearch } from "react-icons/bs";
import PropTypes from "prop-types";

export const SearchBar = ({ onChange }) => {
    return (
        <div className="search-bar">
            <BsSearch color="gray"/>
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired
};
