// Emitted whenever a message is created

const { MessageEmbed } = require("discord.js");

class Message {

    constructor(client) {
        this.client = client;
    }

    async run(message, ops) {

        const client = this.client;

        // —— Exclude messages from bot or system
        if (message.author.bot || message.system) return;

        // —— If message.member is uncached, fetch it
        if (!message.member && message.guild) message.member = await message.guild.members.fetch(message.author);

        // —— Exclude messages those not starting with prefix
        if (!message.content.startsWith(client.config.prefix)) return;

        // —— Message decomposition
        const args    = message.content.split(/\s+/g),
              command = args.shift().slice(client.config.prefix.length),
              cmd     = client.commands.get(command) || client.commands.get(client.aliases.get(command));

        // —— If no aliases or command files are found, stop.
        if (!cmd) return;

        // —— Checks if the command for this user is under cooldown
        if (cmd.cooldown.has(message.author.id))
            return message.delete()
                && message.reply(`veuillez attendre ${Number((cmd.cooldown.get(message.author.id) - Date.now()) / 1000)} seconde(s) pour réutiliser la commande "\`${cmd.help.name}\`".`)
                   .then((msg) => msg.delete({ timeout: 10000 }));

         // —— Checks if the command can be executed in DM
         if (!cmd.conf.allowDMs && message.channel.type !== "text")
            return message.reply("Cette commande ne peut pas être exécutée en message privé.");

        // —— Checks if arguments are required and if they are present
        if (cmd.help.args && !args.length){
            const Embed = new MessageEmbed();
            Embed.setTitle(`${cmd.help.name.replace(/\b\w/g, (l) => l.toUpperCase())}`)
            .setDescription(`> *${cmd.help.description}*`)
            .addField("Syntaxe", `\`\`\`${cmd.help.usage}\`\`\``)
            .addField("Exemples d'utilisation", `\`\`\`${cmd.help.exemple && cmd.help.exemple.map((x) => `${client.config.prefix}${cmd.help.name} ${x}`).join("\n") || "Aucun exemple n'est fourni"}\`\`\``);
            return message.channel.send(!cmd.help.usage || "" ? `Vous n'avez fourni aucun argument, ${message.author} !` : Embed);

        }
           
        // —— Verifies that the user has the right to use the command
        if (client.config.Master === message.author.id || message.channel.type === "text" && message.member.permissions.has(cmd.conf.permission)){
            cmd.setMessage(message);

            // —— Run the command
            cmd.run(message, args);
    
            // —— Starts the cooldown if it is set
            if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
        } else {
            return message.reply("vous n'avez pas les privilèges requis pour exécuter cette commande...");
        }
    }
}

module.exports = Message;