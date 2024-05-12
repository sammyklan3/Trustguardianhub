import { Navbar } from "../../components/Navbar/Navbar";
import { SearchBar } from "../../components/searchBar/searchBar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Loader } from "../../components/loader/Loader";
import { parseNumberWithCommas } from "../../utils/numberUtil";
import {
    FaRegTimesCircle,
    FaEye,
    FaHeart,
    FaFire,
    FaSkating
} from "react-icons/fa";
import { axiosInstance } from "../../api/axiosInstance";
import "./search.css";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistories, setSearchHistories] = useState([]);
    const [trendingSearch, setTrendingSearch] = useState([]);
    const [loading, setLoading] = useState(false);

    const { token } = useContext(AuthContext);

    // This holds the timeout for the search input field
    let timeoutId;

    function handleChange(value) {
        setSearchQuery(value);
        clearTimeout(timeoutId); // Clear any existing timeout
        timeoutId = setTimeout(search, 2000); // Set a new timeout for 500 milliseconds (adjust as needed)
    }


    // Get previous search histories and recommended searches
    useEffect(() => {

        // Get search history
        async function getSearchHistory() {
            setLoading(true);
            
            try {
                const response = await axiosInstance.get("/pastSearches", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSearchHistories(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        // Get trending data
        async function getTrendingData() {
            // try {
            //     const response = await axiosInstance.get("/trendingSearch", {
            //         headers: {
            //             Authorization: `Bearer ${token}`
            //         }
            //     });
            //     setTrendingSearch(response.data);
            // } catch (error) {
            //     console.log(error);
            // }
            // finally {
            //     setLoading(false);
            // }

            setTrendingSearch([
                {
                    id: 1,
                    title: "Telegram",
                    image: "https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2023/08/1-1.webp?ssl=1&quality=80&w=f",
                    views: 100000,
                    likes: 2950,
                    heatLevel: "High"
                },
                {
                    id: 2,
                    title: "WhatsApp",
                    image: "https://pbs.twimg.com/media/GJx6HPZWMAAt3WG.jpg",
                    views: 216000,
                    likes: 1958,
                    heatLevel: "High"
                }
            ]);
        }

        getTrendingData();
        getSearchHistory();
    }, []);

    // Search functionality send a req.query to backend 
    async function search() {
        try {
            const response = axiosInstance.get("/search", {
                params: {
                    query: searchQuery
                },

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // delete search history selectively
    async function deleteSearchHistory(searchId) {
        try {
            const response = await axiosInstance.delete(`/pastSearches/${searchId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // Remove the deleted search history from the state
                setSearchHistories(searchHistories.filter(history => history.search_id !== searchId));
            } else {
                console.log(response.data.error);
            };
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return <Loader />
    }
    // Return the html structure
    return (
        <div className="search-container">
            <Navbar />
            <div className="search-bar-container">
                <SearchBar onChange={handleChange} />
            </div>

            {/* Display search history */}
            {
                searchHistories.length > 0 && searchHistories ? (
                    <div className="search-history-container">
                        <h3>Search History</h3>
                        <div className="search-history">
                            {
                                searchHistories.map((history, index) => (
                                    <div key={index} className="search-history-item">
                                        <p>{history.search_query}</p>
                                        <FaRegTimesCircle className="delete-icon" onClick={() => deleteSearchHistory(history.search_id)} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="search-history-container">
                        <p>No search history</p>
                    </div>
                )
            }

            {/* Display search results */}
            {
                searchQuery.length > 0 ? (
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
                )
            }

            {/* Trending scam reports */}
            <div className="trending-search-container">
                <h3>Trending Scam Reports</h3>
                <div className="trending-search">
                    {
                        trendingSearch && trendingSearch.length > 0 ? (
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
                        )
                    }
                    {/* <div className="trending-search-item">
                        <p>Telegram</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
};
