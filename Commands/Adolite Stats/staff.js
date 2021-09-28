
/* › Commands / Staff .js ————————————————————————————————————————————————————————

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
            name: "staff",
            description: "Affiche l'entièreté de l'équipe Staff Adolite.",
            usage: "staff",
            args: false,
            category: "Statistiques",
            cooldown: 5000,
            aliases: ["stafflist", "staffs"],
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
        
        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `staff`);

        database.query('SELECT rank, username, fonction FROM users WHERE rank >= 4 ORDER BY rank DESC', async function (err, staffs) {

            var staffs_list = [];
            var staff = "";

            Object.keys(staffs).forEach(function (key) {
                staffs_list.push(staffs[key]);
            });

            for (var i = 0; i < staffs_list.length; i++) {
                staff += staffs_list[i].username + `:    \`${staffs_list[i].fonction}\`\n`;
            };
            const genEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail('https://adolite.fr/swf/c_images/album1584/ADM.gif')
                .addField('Equipe Adolite', `voici la liste des staffs:\n\n**${staff}**`)
                .setTimestamp()

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