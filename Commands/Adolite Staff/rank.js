/* › Commands / Rank.js ————————————————————————————————————————————————————————

   — Relie son compte discord au Site d'Adolite.online.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Importation de la base des commandes
const Command = require("../Command"),
    mysql = require('mysql'),
    { MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Verify extends Command {

    constructor(client) {
        super(client, {
            name: "rank",
            description: "Permet de grader une personne sur Adolite Hôtel.",
            usage: "{Pseudo} {Rank}",
            exemple: ["Rayan 1"],
            args: false,
            category: "Staff",
            cooldown: false,
            aliases: false,
            permLevel: 0,
            permission: "VIEW_CHANNEL",
            allowDMs: false
        });
    }

    async run(message, args) {

        // —— Database connection
        const { USER, DB, MDP, HOST } = this.client.config.bdd;
        var database = mysql.createConnection({ host: HOST, user: USER, password: MDP, database: DB, charset: "utf8mb4", });

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `rank`);

        if (DbConnection()) {
            message.delete();

            let username = args[0] ? args[0] : "";
            let rank = args[1] ? args[1] : "1";


            database.query("SELECT id FROM users WHERE discord_id = ? AND discord_verify = ? AND rank >= ? LIMIT 1", [message.author.id, "1", "8"], async function (err, result) {
                if (err) return console.log(err) && Dbdisconnect();
                if (!result || result.length < 1) return Dbdisconnect() && message.reply('pour utiliser cette commande tu dois être Responsable d\'un pôle Staff !');
                
                if (rank < 1 || rank > 9) return Dbdisconnect() && message.channel.send('```diff\n- Une erreur est survenue, reéssayez ultérieurement !```');

                database.query(
                    'UPDATE users SET rank = ? WHERE username = ?',
                    [rank, username],
                    function (err, results) {
                        if (err) return Dbdisconnect() && message.channel.send('```diff\n- Une erreur est survenue, reéssayez ultérieurement !```');
                        if(!results || results.affectedRows < 1) return Dbdisconnect() && message.channel.send('```diff\n- Le compte est introuvable !```');
                        console.log(`[Adolite] Le compte de ${username} a été rank niveau ${rank} !`);

                        var stats = [];
                        Object.keys(result).forEach(function (key) { stats.push(result[key]); });
              

                        let Embed = new MessageEmbed()
                        .setTitle('Utilisateur rank')
                        .setThumbnail(`https://adolite.fr/dcr/c_images/album1584/ADM.gif`)
                        .setColor("RANDOM")
                        .addField(`Le compte de ${username} a été rank :`, `${rank}`)
                        .setFooter('L\'utilisateur a bien été rank !')
                        .setTimestamp();


                        message.channel.send(Embed);
                        Dbdisconnect();
                    }
                );
            });

        }
        database.on('error', function () {
            DbConnection();
        });

        async function Dbdisconnect() {
            await database.end(function (err) {
                if (err) throw err;
                console.log(`[Adolite]` + ` Base de données => ` + `Hors ligne`);
            });
        }

        async function DbConnection() {
            database.connect(function (err) {
                console.log(`[Adolite]` + ` Base de données => ` + `En ligne`);
                return true;
            });
        }
    }
}

module.exports = Verify;