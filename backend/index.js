const yargs = require("yargs");
const { hideBin } = require("yargs/helpers"); //read arguments

const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");

yargs(hideBin(process.argv))
    .command("init", "Initialize the repository", {}, initRepo)
    .command("add <file>", "add a file to the repository", (yargs) => {
        yargs.positional("file", {
            describe: "file to add",
            type: "string"
        });
    }, (argv)=>{
        addRepo(argv.file);
    })
    .command("commit <message>", "Commit the staged files", (yargs) => {
        yargs.positional("message", {
            describe: "commit message",
            type: "string"
        });
    }, commitRepo)
    .command('push', "push commites to S3",{}, pushRepo)
    .command('pull', "pull commits from S3", {}, pullRepo)
    .command('revert <commitId>', "revert to a previous commit", (yargs) => {
        yargs.positional("commitId", {
            describe: "commit ID to revert to",
            type: "string"
        });
    }, revertRepo)
    .demandCommand(1, "You need at least one command before moving on")
    .help().argv;
