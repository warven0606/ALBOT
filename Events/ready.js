class Ready {

    constructor(client) {
        this.client = client;
    }

    async run() {
        const client = this.client;

        // —— Cleaning the console 💨
        console.clear();

        // —— Just an ascii header, because I like it.
        console.log(
            "   ##     ####      ####    ##        ####    ######   ######\n"+
            "  ####    ## ##    ##  ##   ##         ##       ##     ##\n"+ 
            " ##  ##   ##  ##   ##  ##   ##         ##       ##     ##\n"+ 
            " ######   ##  ##   ##  ##   ##         ##       ##     ####\n"+ 
            " ##  ##   ##  ##   ##  ##   ##         ##       ##     ##\n"+ 
            " ##  ##   ## ##    ##  ##   ##         ##       ##     ##\n"+ 
            " ##  ##   ####      ####    ######    ####      ##     ######\n"
            ); 
            
        const { status, games, interval } = client.config.presence;

        // —— Set default presence
        games instanceof Array && games.length > 0 &&
            client.user.setPresence({
                status,
                activity: {
                    name: games[0].name ? games[0].name : null,
                    type: games[0].type ? games[0].type : null,
                    url : games[0].url  ? games[0].url  : null
                }
            });

        // —— If the user has chosen a multiple custom activity
        games instanceof Array && games.length > 1 &&
        // —— Every x seconds, the activity (and its type) will change.
        setInterval(() => {
            const index = Math.floor(Math.random() * (games.length));
            client.user.setActivity(games[index].name, {
                type: games[index].type,
                url : games[index].url || "https://adolite.fr"
            });
        }, ((typeof interval === "number" && interval) || 30) * 1000);

    }
}

module.exports = Ready;