import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import "./auth.css";
import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            setCurrentUser(res.data.userId);
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("Login Failed!");
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
                <h3 className="text-center mb-4">Sign In</h3>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            autoComplete="off"
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
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p>
                        New to GitHub? <Link to="/signup" className="text-info">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
