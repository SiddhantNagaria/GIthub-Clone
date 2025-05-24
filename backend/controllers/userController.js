const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

dotenv.config();

const uri = process.env.MONGO_URI;

let client;

async function connectClient() {
    if (!client) {
        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    await client.connect();
}

async function signup(req, res) {
    const { username, password, email } = req.body;
    try {
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            password: hashedPassword,
            email,
            repositories: [],
            followedUsers: [],
            starRepos: [],
        }

        const result = await usersCollection.insertOne(newUser);
        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error("Error during signup", err.message);
        res.status(500).send("Server Error");
    }
};

async function login(req, res) {
    const { email, password } = req.body;
    try {
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1hr" });
        res.json({ token, userId: user._id });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).send("server error !");
    }
};

async function getAllUsers(req, res) {
    try {
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        const users = await usersCollection.find({}).toArray();
        res.json(users);

    } catch (err) {
        console.error("Error during fetching:", err.message);
        res.status(500).send("server error !");
    }
};


async function getUserProfile(req, res) {
    const currentId = req.params.id;
    try {
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
            _id: new ObjectId(currentId)
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.send(user, {message:"Profile fetched !"})
    } catch (err) {
        console.error("Error during fetching:", err.message);
        res.status(500).send("server error !");
    }
};

async function updateUserProfile(req, res) {
    res.send("profile updated");
};

async function deleteUserProfile(req, res) {
    res.send("profile deleted");
};

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}