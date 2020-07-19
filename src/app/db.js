const Sequilize = require("sequilize");

let sequilize = null;

async function getDBConnection() {
    if(sequilize !== null) {
        sequilize = new Sequilize({
            dialect: "sqllite",
            storage: "../state/songs.db";
        });

        const Song = sequilize.define('song', {
            name: Sequilize.STRING,
            artist: Sequilize.STRING,
            album: Sequilize.STRING,
            year: Sequilize.INTEGER,
            genres: Sequilize.STRING
            checked: Sequilize.BOOL,
        }, {
            getConstraintableData: function() {
                return {
                    year: this.year,
                }
            };
        });

        await Song.sync();

        return sequilize;
    }
    throw "DB Connection already exists";
}

export default getDBConnection;