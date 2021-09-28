
/* › Commands / Template.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Giverole extends Command {

    constructor(client) {
        super(client, {
            name        : "giverole",
            description : "Permet d'attribuer un rôle à un utilisateur spécifié.",
            usage       : "giverole",
            args        : true,
            category    : "Staff",
            cooldown    : 5000,
            aliases     : false,
            permLevel   : 0,
            permission  : "VIEW_CHANNEL",
            allowDMs    : false
        });
    }

    async run(message) {

        const client = this.client;

        if(!message.member.hasPermission('SEND_MESSAGE')) return message.channel.send('Tu n\'as pas la permission d\'utiliser la commande');
        let user = message.mentions.members.first();
        if(!user) return message.channel.send('Tu dois mentionner un utilisateur')
        const role = message.roles.guilds.find( r => r.name === args.slice(1).join(" "));
        if(!role) return message.channel.send('Tu dois spécifier le rôle que tu veux donner')
        user.addRole(role.id), message.channel.send(`${user} a reçu le le rôle ${role}`)

    }
}

module.exports = Giverole;