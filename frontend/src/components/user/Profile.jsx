import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({ username: "username" });
    const { setCurrentUser } = useAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userId = localStorage.getItem("userId");

            if (userId) {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/userProfile/${userId}`
                    );
                    setUserDetails(response.data);
                } catch (err) {
                    console.error("Cannot fetch user details: ", err);
                }
            }
        };
        fetchUserDetails();
    }, []);

    return (
        <>
            <Navbar />
            <div className="profile-nav border-bottom border-secondary">
                <ul className="nav nav-tabs profile-tabs">
                    <li className="nav-item">
                        <span className="nav-link active">Overview</span>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => navigate("/repo")}
                            style={{ background: "transparent", border: "none" }}
                        >
                            Starred Repositories
                        </button>
                    </li>
                </ul>
            </div>

            <div className="profile-container">
                {/* Left - Profile Summary */}
                <div className="profile-left">
                    <div className="profile-image mb-3"></div>
                    <h4 className="fw-bold">{userDetails.username}</h4>
                    <button className="btn btn-dark my-2">Follow</button>
                    <div className="d-flex flex-column align-items-start gap-1 mt-2">
                        <span>10 <span className="text-secondary">Follower</span></span>
                        <span>3 <span className="text-secondary">Following</span></span>
                    </div>
                </div>

                {/* Right - Contributions */}
                <div className="profile-right">
                    <h5 className="mb-3">Recent Contributions</h5>
                    <HeatMapProfile />
                </div>
            </div>

            {/* Logout */}
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    setCurrentUser(null);
                    window.location.href = "/auth";
                }}
                className="btn btn-dark position-relative"
                style={{ bottom: "50px", right: "50px" }}
            >
                Logout
            </button>
        </>
    );
};

export default Profile;
