import { Navbar } from "../../components/Navbar/Navbar";
import { SearchBar } from "../../components/searchBar/searchBar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Loader } from "../../components/loader/Loader";
import { parseNumberWithCommas } from "../../utils/numberUtil";
import { RiMenu2Fill } from "react-icons/ri";
import {
    FaRegTimesCircle,
    FaEye,
    FaHeart,
    FaFire,
    FaSkating
} from "react-icons/fa";
import { axiosInstance } from "../../api/axiosInstance";
import "./search.css";
import { FaTrash } from "react-icons/fa6";

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistories, setSearchHistories] = useState([]);
    const [trendingSearch, setTrendingSearch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const { token } = useContext(AuthContext);

    const handleChange = debounce((value) => {
        setSearchQuery(value);
        if (value) {
            search(value);
        }
    }, 500);

    const addHistoryToSearchBar = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        const getSearchHistory = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("/pastSearches", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSearchHistories(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const getTrendingData = async () => {
            try {
                const response = await axiosInstance.get("/trendingSearch", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTrendingSearch(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getTrendingData();
        getSearchHistory();
    }, [token]);

    const search = async (query) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/search", {
                params: { query },
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const clearSearchHistory = async () => {
        try {
            const response = await axiosInstance.delete("/clearSearches", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                setSearchHistories([]);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteSearchHistory = async (searchId) => {
        try {
            const response = await axiosInstance.delete(`/pastSearches/${searchId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                setSearchHistories(searchHistories.filter(history => history.search_id !== searchId));
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="search-container">
            <Navbar />
            <div className="search-bar-container">
                <SearchBar onChange={e => handleChange(e.target.value)} />
            </div>

            {searchHistories.length > 0 ? (
                <div className="search-history-container">
                    <div className="search-history-header">
                        <h3>Search History</h3>
                        <button onClick={() => setShowMenu(!showMenu)}><RiMenu2Fill /></button>
                        {showMenu && (
                            <div className="search-history-menu">
                                <p onClick={clearSearchHistory}>Clear history <FaTrash color="red" /></p>
                                <p>Edit history</p>
                            </div>
                        )}
                    </div>
                    <div className="search-history">
                        {searchHistories.map((history, index) => (
                            <div key={index} className="search-history-item">
                                <p onClick={() => addHistoryToSearchBar(history.search_query)}>{history.search_query}</p>
                                <FaRegTimesCircle className="delete-icon" onClick={() => deleteSearchHistory(history.search_id)} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="search-history-container">
                    <p>No search history</p>
                </div>
            )}

            {searchQuery ? (
                <div className="search-results-container">
                    <h3>Search Results</h3>
                    <div className="search-results">
                        <div className="search-results-item">
                            <p>Telegram</p>
                        </div>
                        <div className="search-results-item">
                            <p>WhatsApp</p>
                        </div>
                        <div className="search-results-item">
                            <p>Facebook</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="start-search">
                    <p className="icon"><FaSkating size={30} /></p>
                    <p className="text">Start searching</p>
                </div>
            )}

            <div className="trending-search-container">
                <h3>Trending Scam Reports</h3>
                <div className="trending-search">
                    {trendingSearch.length > 0 ? (
                        trendingSearch.map((search, index) => (
                            <div key={index} className="trending-search-item">
                                <div className="trending-search-item-title">
                                    <p>{search.title}</p>
                                </div>
                                <div className="trending-search-item-image">
                                    <img src={search.image} alt={search.title} />
                                </div>
                                <div className="trending-search-item-views">
                                    <p><FaEye />{parseNumberWithCommas(search.views)} views</p>
                                </div>
                                <div className="trending-search-item-likes">
                                    <p><FaHeart color="red" />{parseNumberWithCommas(search.likes)} likes</p>
                                </div>
                                <div className="trending-search-item-heat-level">
                                    <p><FaFire /> {search.heatLevel}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No trending search</p>
                    )}
                </div>
            </div>
        </div>
    );
};
