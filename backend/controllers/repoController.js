const createRpository = (req, res) => {
    res.send("Repository created");
};

const getALlRepositories = (req, res) => {
    res.send("All repositories fetched");
};

const fetchRespositoryById = (req, res) => {
    res.send("Repository details fetched");
};

const fetchRespositoryByName = (req, res) => {
    res.send("Repository details fetched");
};

const fetchRespositoryForCurrentUser = (req, res) => {
    res.send("repositories for logged in user fetched");
}

const updateRepositoryById = (req, res) => {
    res.send("repository updated");
};

const toggleVisibilityById = (req, res) => {
    res.send("visibility toggled");
};

const deleteRepositoryById = (req, res) => {
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