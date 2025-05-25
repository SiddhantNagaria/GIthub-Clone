const mongoose = require('mongoose');
const Repository = require('../models/repoModel');
const User = require('../models/userModel');
const Issue = require('../models/issueModel');

async function createRpository(req, res) {
    const { owner, name, issues, content, description, visibility } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ error: "Repository name is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid User Id" });
        }
        
        const newRepository = new Repository({
            name, description, visibility, content, owner, issues
        });

        const result = await newRepository.save();

        res.status(201).json({
            message:"Repository Created",
            repositoryId : result._id,
        });
    } catch (err) {
        console.error("Error during repository creation:", err.message);
        res.status(500).send("server error !");
    }
};

async function getALlRepositories(req, res) {
    res.send("All repositories fetched");
};

async function fetchRespositoryById(req, res) {
    res.send("Repository details fetched");
};

async function fetchRespositoryByName(req, res) {
    res.send("Repository details fetched");
};

async function fetchRespositoryForCurrentUser(req, res) {
    res.send("repositories for logged in user fetched");
}

async function updateRepositoryById(req, res) {
    res.send("repository updated");
};

async function toggleVisibilityById(req, res) {
    res.send("visibility toggled");
};

async function deleteRepositoryById(req, res) {
    res.send("repository Deleted");
};

module.exports = {
    createRpository,
    deleteRepositoryById,
    fetchRespositoryById,
    fetchRespositoryByName,
    fetchRespositoryForCurrentUser,
    getALlRepositories,
    toggleVisibilityById,
    updateRepositoryById
};