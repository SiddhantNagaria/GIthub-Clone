const fs = require("fs");
const path = require("path");
const {promisify} = require("util");


const readdir = promisify(fs.readdir); //modified version of readdir
const copyFile = promisify(fs.copyFile); //modified version of copyFile

async function revertRepo(commitId) {
    const repoPath = path.resolve(process.cwd(), ".mygit");
    const commitsPath = path.join(repoPath, "commits");

    try{
        const commitDir = path.join(commitsPath, commitId);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, ".");
        for(const file of files){
            await copyFile(path.join(commitDir, file),path.join(parentDir, file));
        }
        console.log(`Reverted to commit ${commitId}`);
    }catch(err){
        console.error("Error reverting commit:", err);
        return;
    }
}
module.exports = { revertRepo };