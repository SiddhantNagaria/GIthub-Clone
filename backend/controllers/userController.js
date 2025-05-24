const getAllUsers = (req, res) => {
    res.send("All users fetched");
};

const signup = (req, res) => {
    res.send("signing up");
};

const login = (req, res) => {
    res.send("logging in");
};

const getUserProfile = (req, res) => {
    res.send("profile fetched");
};

const updateUserProfile = (req, res) => {
    res.send("profile updated");
};

const deleteUserProfile = (req, res) => {
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