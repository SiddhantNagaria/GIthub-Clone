import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRepo = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        content: [""],
        visibility: true,
        owner: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setFormData(prev => ({ ...prev, owner: userId }));
        }
    }, []);

    const handleChange = (e, index = null) => {
        const { name, value, type, checked } = e.target;

        if (name === "content") {
            const updatedContent = [...formData.content];
            updatedContent[index] = value;
            setFormData({ ...formData, content: updatedContent });
        } else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addContentField = () => {
        setFormData({ ...formData, content: [...formData.content, ""] });
    };

    const removeContentField = (index) => {
        const updatedContent = [...formData.content];
        updatedContent.splice(index, 1);
        setFormData({ ...formData, content: updatedContent });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/repo/create", formData);
            alert("Repository created!");
            navigate("/");
        } catch (error) {
            console.error("Error creating repository:", error);
            alert("Failed to create repository");
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="container py-5 text-light">
            <h2 className="mb-4">Create New Repository</h2>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                    <label className="form-label">Repository Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label className="form-label">Description (Optional)</label>
                    <textarea
                        className="form-control"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Content Fields */}
                <div className="mb-3">
                    <label className="form-label">Content Files</label>
                    {formData.content.map((line, index) => (
                        <div key={index} className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                name="content"
                                placeholder={`File ${index + 1}`}
                                value={line}
                                onChange={(e) => handleChange(e, index)}
                            />
                            {formData.content.length > 1 && (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => removeContentField(index)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={addContentField}
                    >
                        Add File
                    </button>
                </div>

                {/* Visibility */}
                <div className="form-check form-switch mb-4">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="visibility"
                        checked={formData.visibility}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">
                        {formData.visibility ? "Public" : "Private"}
                    </label>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-primary">
                        Create Repository
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateRepo;
