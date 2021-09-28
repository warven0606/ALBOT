
/* › Commands / Exec.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command"),
{ MessageEmbed } = require("discord.js"),
{ exec } = require("child_process");



// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Exec extends Command {

    constructor(client) {
        super(client, {
            name: "exec",
            description: "Éxecute le code saisis.",
            usage: "{code à éxecuter}",
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

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `exec`);

          const code = args.join(' ');
          if (!code) return message.channel.send('Tu as saisi aucun code, tu es stupide ?');
          exec(code, (error, stdout, stderr) => {
            const input = `\`\`\`Bash\n${code}\n\`\`\``;
            if (error) {
              let output = `\`\`\`Bash\n${error}\n\`\`\``;
              const embed = new MessageEmbed()
                .setTitle('Execute')
                .addField(':inbox_tray: Input', input)
                .addField(':x: Error', output)
                .setColor(0x00A2E8)
              return message.channel.send(embed);
            } else {
              const output = stderr || stdout;
              const output2 = `\`\`\`Bash\n${output}\n\`\`\``;
              const embed = new MessageEmbed()
                .setTitle('Execute')
                .addField(':inbox_tray: Input', input)
                .addField(':outbox_tray: Output', output2)
                .setColor(0x00A2E8)
              return message.channel.send(embed);
            }
          });

    }
}



module.exports = Exec;