
/* › Commands / Template.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const { MessageEmbed } = require("discord.js");
const Command = require("../Command");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class hball extends Command {

    constructor(client) {
        super(client, {
            name        : "8ball",
            description : "Commande fun, avec réponse automatique",
            usage       : "{Question}",
            args        : true,
            category    : "General",
            cooldown    : 5000,
            aliases     : ["8ball"],
            permLevel   : 0,
            permission  : "VIEW_CHANNEL",
            allowDMs    : false
        });
    }

    async run(message, args) {

        const client = this.client;

        let answers = ["Non :x:", "Non", "Balek :face_palm:", "Peut être... :thinking:", "Absolument :interrobang:", "J'men fiche", "De ouf", "Je dis oui !", "Pourquoi pas"]
        let question = args.slice(1).join(" ")
        let embed = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setColor("RANDOM")
          .addField("Question :", question)
          .addField("Réponse :", answers[Math.floor(Math.random() * answers.length)])
          .setTimestamp()
          .setFooter("8ball | Adolite")
        message.channel.send(embed)
      }
}

module.exports = hball;