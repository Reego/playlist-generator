const utilCmds = require("./utility");
const specialCMDMap = require("./mapping");

const getDBConnection = require("../db");

async function processCommand(commandName, argv) {
    if(commandName === "help") {
        utilCmds.executeHelp(argv);
    }
    else if(commandName === "status") {
        const db = getDBConnection();
        utilCmds.executeStatus(db, argv);
    }
    else {
        let command = specialCMDMap[commandName];
        if(command === undefined) {
            process.stderr.write(`\nThe command ${commandName} does not exist.\n\n`);
        }
        const db = getDBConnection();
        await command(db, argv);
        process.stdout.write("\nFinished executing succesfully.\n");
    }
}