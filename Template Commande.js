
/* › Commands / Template.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Tpl extends Command {

    constructor(client) {
        super(client, {
            name        : "tpl",
            description : "Ceci est une commande qui sert de template.",
            usage       : "tpl",
            args        : false,
            category    : "General",
            cooldown    : 5000,
            aliases     : ["Template"],
            permLevel   : 0,
            permission  : "READ_MESSAGES",
            allowDMs    : false
        });
    }

    async run(message) {

        const client = this.client;

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `tpl`);

        message.channel.send("tnt");

    }
}

module.exports = Tpl;