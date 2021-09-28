// —— A powerful library for interacting with the Discord API
const { Client, Collection, DiscordAPIError } = require("discord.js");


// —— FileSystem
const { readdir, createWriteStream }            = require("fs");

// ██████ Initialization ███████████████████████████████████████████████████████

class Adolite extends Client {

    constructor() {

        // —— Initialise discord.js client
        super({ autoReconnect: true });

        // —— Import of the parameters required for operation
        this.config     = require("./config");
        // —— Collection of all commands
        this.commands  = new Collection();
        // —— Collection of all command aliases
        this.aliases   = new Collection();



        console.log(`Client initialised. —— Node ${process.version}.`);

        super.login(this.config.token);

        // Giveaway ------------------------------------------------------------
     

        
 
        // –– Commands Handler –––––––––––––––––––––––––––––––––––––––––––––––––

        readdir("./Commands/", (err, cmdDir) => {
            if (err) { throw err; }
            cmdDir.filter((subDir) => !subDir.includes(".")).forEach((catDir) => {
                readdir(`./Commands/${catDir}/`, (err, cmds) => {
                    if (err) { throw err; }
                    cmds.filter((file) => file.endsWith(".js")).forEach((cmd) => {
                        const command = new (require(`./Commands/${catDir}/${cmd}`))(this);
                        this.commands.set(command.help.name, command);
                        command.conf.aliases.forEach((a) => this.aliases.set(a, command.help.name));
                    
                    });
                });
            });
        });

        // –– Events Handler –––––––––––––––––––––––––––––––––––––––––––––––––––

        readdir("./Events/", (err, events) => {
            if (err) { throw err; }
            events.filter((event) => event.endsWith(".js")).forEach((file) => {
                const event = new (require(`./Events/${file}`))(this);
                super.on(file.split(".")[0], (...args) => event.run(...args));
            });
        });             


    }
}

new Adolite();