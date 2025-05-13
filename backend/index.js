const yargs = require("yargs");
const { hideBin } = require("yargs/helpers"); //read arguments

const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");

yargs(hideBin(process.argv))
    .command("init", "Initialize the repository", {}, initRepo)
    .command("add <file>", "add a file to the repository", (yargs) => {
        yargs.positional("file", {
            describe: "file to add",
            type: "string"
        });
    }, addRepo)
    .demandCommand(1, "You need at least one command before moving on")
    .help().argv;
