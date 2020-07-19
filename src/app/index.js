import React from "react";

const processCommand = require("./command");

function main(args) {
    const command = (args.length > 0) ? args[0] : "help";
    const commandArgs = args.splice(1);

    (processCommand(command, commandArgs)
        .catch((err) => {
            process.stderr.write(`\nUh oh, something went wrong:\n\n${err}\n`);
        })
    );
}

main(process.argv.splice(2));

const App = () => {
    
};

export default App;