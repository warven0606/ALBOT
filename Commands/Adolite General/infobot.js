
/* › Commands / Template.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const { MessageEmbed } = require("discord.js");
const Command = require("../Command");
const cpuStat = require("cpu-stat");
const os = require('os');
let cpuLol;
cpuStat.usagePercent(function(err, percent, seconds) {
if (err) {
    return console.log(err);
}
})


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Infobot extends Command {

    constructor(client) {
        super(client, {
            name        : "infobot",
            description : "Permet de voir les informations concernant le bot.",
            usage       : "infobot",
            args        : false,
            category    : "General",
            cooldown    : 5000,
            aliases     : ["infos"],
            permLevel   : 0,
            permission  : "READ_MESSAGES",
            allowDMs    : false
        });
    }

    async run(message) {

        const client = this.client;

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `infobot`);
        var infobot = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("📌 • __Développeur__", "`Warven#5560`", true)
        .addField("🛡️ • __Système__", "Plateforme : " + "`" +  `${os.platform()}`+ "` \n Arch : " + "`" + `${os.arch()}` + "` \n CPU : " +  "`" + `${os.cpus().map(i => `${i.model}`)[0]}` + "`")
        .addField("💻 • __Processeur__", "RAM: " + "`" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MB` | Latence avec l'API :" + "`" + `${Math.round(client.ping)}` + " ms`")
        .addField("🕹️ • __En ligne depuis__", (Math.round(client.uptime / (1000 * 60 * 60))) + ' heures  ' + (Math.round(client.uptime / (1000 * 60)) % 60) + ' minutes ' + (Math.round(client.uptime / 1000) % 60) + ' secondes ', true)
        .setColor("#2A2A32")
    message.channel.send(infobot)

    }
}

module.exports = Infobot;