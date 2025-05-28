import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";

import logo from "../../assets/github-mark-white.svg";
import "./auth.css";
const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/signup", {
                email,
                password,
                username,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            setCurrentUser(res.data.userId);
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("Signup Failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="login-logo-container text-center mb-3">
                <img src={logo} alt="Logo" width={48} />
            </div>

            <div className="card text-white bg-dark p-4 rounded" style={{ width: "380px" }}>
                <h3 className="text-center mb-4">Sign Up</h3>

                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fw-bold">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p>
                        Already have an account? <Link to="/auth" className="text-info">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
