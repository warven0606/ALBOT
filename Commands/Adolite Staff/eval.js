
/* › Commands / Eval.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command"),
{ MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Eval extends Command {

    constructor(client) {
        super(client, {
            name: "eval",
            description: "Évalue le code saisis.",
            usage: "{code à evaluer}",
            args: true,
            category: "Développement",
            cooldown: 5000,
            aliases: false,
            permLevel: 0,
            permission: "ADMINISTRATOR",
            allowDMs: false
        });
    }

    async run(message, args) {

        const client = this.client;

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `eval`);

        try {
            var code = args.join(" ");
            if (code.includes("client.config.token")) return message.channel.send("Je ne veux pas faire ça 0_0")
            var evaled = eval(code);
      
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            
            const embed = new MessageEmbed()
              .setColor(0x00A2E8)
              .addField(":inbox_tray: Entrée: ", `\`\`\`${code}\`\`\``)
              .addField(":outbox_tray: sortie: ", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
            message.channel.send({embed})
          } catch (err) {
            const embed = new MessageEmbed()
            .setColor(0x00A2E8)
            .addField(":inbox_tray: Entrée: ", `\`\`\`${code}\`\`\``)
            .addField(":outbox_tray: sortie: ", `\`\`\`${clean(err)}\`\`\``)
          message.channel.send({embed})
          }
    }
}

function clean(text) {
    if (typeof (text) === 'string')
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    else
        return text;
}

module.exports = Eval;