const fs = require("fs");
const path = require("path");

const commandsHelpPath = "../../docs/commands.md";

function executeHelp(argv) {
    fs.readFile(commandsHelpPath, { encoding: "utf-8" }, (err, data) => {
        if(!err) {
            process.stdout.write(data);
        } else {
            process.stderr.write(err);
        }
    });
}

function executeStatus(db, argv) {
    
}

export default {
    executeHelp,
    executeStatus,
};