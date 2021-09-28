
/* › Commands / Whosonline .js ————————————————————————————————————————————————————————

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command"),
mysql = require('mysql'),
{ MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Staff extends Command {

    constructor(client) {
        super(client, {
            name: "whosonline",
            description: "Affiche l'entièreté des utilisateurs en ligne sur Adolite.",
            usage: "whosonline",
            args: false,
            category: "Statistiques",
            cooldown: 5000,
            aliases: ["onlinelist", "coliste"],
            permLevel: 0,
            permission: "VIEW_CHANNEL",
            allowDMs: false
        });
    }

    async run(message) {

        const client = this.client;
        // —— Database connection
        const { USER, DB, MDP, HOST } = this.client.config.bdd;
        var database = mysql.createConnection({ host: HOST, user: USER, password: MDP, database: DB, charset: "utf8mb4", });
        
        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `whosonline`);

        database.query('SELECT username FROM users WHERE online = ? ORDER BY rank DESC', ["1"], async function (err, conn) {

            var co_list = [];
            var co = "";

            Object.keys(conn).forEach(function (key) {
                co_list.push(conn[key]);
            });

            for (var i = 0; i < co_list.length; i++) {
                co += co_list[i].username + `\n`;
            };
            const genEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail('https://adolite.fr/dcr/c_images/album1584/IT162.gif')
                .addField('Membre en ligne', `voici la liste des Adolite's connectés:\n\n**${co}**`)
                .setTimestamp();

            message.channel.send(genEmbed)
            await database.end(function (err) {
                if (err) throw err;
            });

        });

        database.on('error', function () {
            DbConnection();
        });

        async function DbConnection() {
            database.connect(function (err) {
                console.log(`[Adolite]` + ` Base de données => ` + `En ligne`);
                return true;
            });
        }
    }
}

module.exports = Staff;