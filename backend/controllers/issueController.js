const createIssue = (req, res) => {
    res.send("issue created");
};

const updateIssueById = (req, res) => {
    res.send("issue updated");
};

const deleteIssueById = (req, res) => {
    res.send("Issue updated");
};

const getAllIssues = (req, res) => {
    res.send("All issues fetched");
};

const getIssueById = (req, res) => {
    res.send("Issue Details Fetched");
};

module.exports = {
    createIssue,
    deleteIssueById,
    getAllIssues,
    getIssueById,
    updateIssueById
}