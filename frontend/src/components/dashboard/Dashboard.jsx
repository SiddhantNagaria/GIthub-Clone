import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./dashboard.css";

const Dashboard = () => {
    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        const fetchRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3000/repo/user/${userId}`);
                const data = await response.json();
                setRepositories(data.repositories || []);
            } catch (err) {
                console.error("Error fetching repositories: ", err);
            }
        };

        const fetchSuggestedRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3000/repo/all`);
                const data = await response.json();

                // Filter out current user's repos
                const otherRepos = (data.repositories || []).filter(
                    (repo) => repo.userId !== userId
                );

                setSuggestedRepositories(otherRepos);
                console.log("Suggested Repos:", otherRepos);
            } catch (err) {
                console.error("Error fetching suggested repositories: ", err);
            }
        };

        fetchRepositories();
        fetchSuggestedRepositories();
    }, []);

    useEffect(() => {
        if (searchQuery === "") {
            setSearchResults(repositories);
        } else {
            const filtered = repositories.filter((repo) =>
                repo.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filtered);
        }
    }, [searchQuery, repositories]);

    return (
        <>
            <Navbar />
            <div className="container-fluid text-white mt-4">
                <div className="row px-4">
                    {/* Suggested Repositories */}
                    <aside className="col-md-3 bg-dark-subtle rounded-3 p-3 mb-4 shadow-sm">
                        <h5 className="text-info mb-3">Suggested Repositories</h5>
                        {suggestedRepositories.length > 0 ? (
                            suggestedRepositories.map((repo) => (
                                <div key={repo._id} className="mb-3">
                                    <h6 className="text-light">{repo.name}</h6>
                                    <p className="text-muted small">{repo.description || "No description"}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No suggestions available.</p>
                        )}
                    </aside>

                    {/* Your Repositories */}
                    <main className="col-md-6 mb-4">
                        <h4 className="mb-3 text-center">Your Repositories</h4>
                        <input
                            type="text"
                            className="form-control mb-4"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchResults.length > 0 ? (
                            searchResults.map((repo) => (
                                <div key={repo._id} className="mb-3 bg-secondary p-3 rounded text-white shadow-sm">
                                    <h6>{repo.name}</h6>
                                    <p className="text-light small">{repo.description || "No description"}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted text-center">No repositories found.</p>
                        )}
                    </main>

                    {/* Upcoming Events */}
                    <aside className="col-md-3 bg-dark-subtle rounded-3 p-3 mb-4 shadow-sm">
                        <h5 className="text-warning mb-3">Upcoming Events</h5>
                        <ul className="list-unstyled small text-light">
                            <li>Tech Conference - Dec 15</li>
                            <li>Developer Meetup - Dec 25</li>
                            <li>React Summit - Jan 5</li>
                        </ul>
                    </aside>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
