
/* › Commands / Help.js ————————————————————————————————————————————————————————

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command"),
{ MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Help extends Command {

    constructor(client) {
        super(client, {
            name        : "help",
            description : "Affiche la liste de toutes les commandes disponibles.",
            usage       : "help",
            args        : false,
            category    : "General",
            cooldown    : 5000,
            aliases     : false,
            permLevel   : 0,
            permission  : "VIEW_CHANNEL",
            allowDMs    : true
        });
    }

    async run(message, args) {

        const client = this.client;

        const commands = client.commands;

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `help`);

        if (!args.length) {
            /* 
            data.push('Voici une liste de toutes mes commandes :');
            data.push(commands.map(command => command.help.name).join(', '));
            data.push(`\nVous pouvez envoyer \`${client.config.prefix}help [nom de la commande]\` pour obtenir des informations sur une commande spécifique !`);
            
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('je t\'ai envoyé un DM avec toutes mes commandes !');
                })
                .catch(error => {
                    console.error(`N'a pas pu envoyer d'aide DM à ${message.author.tag}.\n`, error);
                    message.reply('il semble que je ne puisse pas te DM ! Tu as les DM désactivées ?');
                });*/

                    const commandNames = commands.keyArray();
                    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

                    let currentCategory = "";
                    let output = `= Liste des Commandes =\n\n[Utiliser ${client.config.prefix}help <nom de la commande> pour plus de détails]\n`;
                    const sorted = commands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
                    sorted.forEach( c => {
                    const cat = c.help.category.toUpperCase();
                    if (currentCategory !== cat) {
                        output += `\u200b\n== ${cat} ==\n`;
                        currentCategory = cat;
                    }
                    output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
                    });
                    message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
        } else {
            const cmd = client.commands.get(args.join(' ')) || client.commands.get(client.aliases.get(args.join(' ')))

            if(!cmd) return message.reply('commande introuvable !');

            const Embed = new MessageEmbed();
            Embed.setTitle(`${cmd.help.name.replace(/\b\w/g, (l) => l.toUpperCase())}`)
            .setDescription(`> *${cmd.help.description}*`)
            .addField("Syntaxe", `\`\`\`${cmd.help.usage}\`\`\``)
            .addField("Exemples d'utilisation", `\`\`\`${cmd.help.exemple && cmd.help.exemple.map((x) => `${client.config.prefix}${cmd.help.name} ${x}`).join("\n") || "Aucun exemple n'est fourni"}\`\`\``);
            
            message.channel.send(Embed);
        }

    }
}

module.exports = Help;