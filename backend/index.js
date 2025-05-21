const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');


const yargs = require("yargs");
const { hideBin } = require("yargs/helpers"); //read arguments

dotenv.config();


const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");

yargs(hideBin(process.argv))
    .command("start", "Start a new server", {}, startServer)
    .command("init", "Initialize the repository", {}, initRepo)
    .command("add <file>", "add a file to the repository", (yargs) => {
        yargs.positional("file", {
            describe: "file to add",
            type: "string"
        });
    }, (argv) => {
        addRepo(argv.file);
    })
    .command("commit <message>", "Commit the staged files", (yargs) => {
        yargs.positional("message", {
            describe: "commit message",
            type: "string"
        });
    }, (argv) => {
        commitRepo(argv.message);
    })
    .command('push', "push commits to S3", {}, pushRepo)
    .command('pull', "pull commits from S3", {}, pullRepo)
    .command('revert <commitId>', "revert to a previous commit", (yargs) => {
        yargs.positional("commitId", {
            describe: "commit ID to revert to",
            type: "string"
        });
    }, (argv) => {
        revertRepo(argv.commitId);
    })
    .demandCommand(1, "You need at least one command before moving on")
    .help().argv;

// Function to start the server
function startServer() {
    console.log("server logic called");
    const app = express();
    const port = process.env.PORT||3000;

    app.use(bodyParser.json());
    app.use(express.json());

    const mongoURI = process.env.MONGO_URI;
    mongoose.connect(mongoURI).then(()=>{
        console.log('mongoDB connected !');
    }).catch((err)=>{
        console.error("Unable to connect", err);
    });
}