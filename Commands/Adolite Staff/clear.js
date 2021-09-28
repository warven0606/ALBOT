
/* › Commands / Clear.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Clear extends Command {

    constructor(client) {
        super(client, {
            name        : "clear",
            description : "Supprimes les x derniers messages.",
            usage       : "clear {1-100}",
            args        : true,
            category    : "Staff",
            cooldown    : 5000,
            aliases     : ["purge"],
            permLevel   : 0,
            permission  : "MANAGE_MESSAGES",
            allowDMs    : false
        });
    }

    async run(message, args) {
        let count = parseInt(args[0])
        if (!count || count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100");
        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `clear ${count}`);
        await message.channel.bulkDelete(count, true);
    }
}

module.exports = Clear;