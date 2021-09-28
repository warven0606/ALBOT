
/* › Commands / Sondage.js ————————————————————————————————————————————————————————

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command"),
    { MessageEmbed } = require("discord.js");

// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Sondage extends Command {

    constructor(client) {
        super(client, {
            name: "sondage",
            description: "Commande reservée aux staff Adolite.",
            usage: "{Text}",
            exemple: ["Aimez-vous le viagra ?"],
            args: true,
            category: "Staff",
            cooldown: 5000,
            aliases: false,
            permLevel: 0,
            permission: "MANAGE_MESSAGES",
            allowDMs: false
        });
    }

    async run(message, args) {

        const client = this.client;

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `sondage`);
        message.channel.send('***__Mention__*** : <@&839795135406407710>')
        let sondage = args.join(' ');
        let Embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor("RANDOM")
            .addField("Sondage :", sondage)
            .setTimestamp()
            .setFooter("Sondage | Adolite");

        message.channel.send(Embed)
            .then(function (message) {
                message.react("👍")
                message.react("👎")
            }).catch(function (err) {
                console.log(err);
            });

    }
}

module.exports = Sondage;