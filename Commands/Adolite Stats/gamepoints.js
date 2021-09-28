/* › Commands / Gamepoints.js ————————————————————————————————————————————————————————

   — Envoie une requête à la base de donnée pour 
   afficher le top Joueurs en nombre de gamepoints sur Adolite.online.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Importation de la base des commandes
const Command = require("../Command"),
    mysql = require('mysql'),
    { MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Credits extends Command {

    constructor(client) {
        super(client, {
            name: "gamepoints",
            description: "Affiche le top Joueur en nombre de Game Points sur Adolite.",
            usage: "gamepoints",
            args: false,
            category: "Statistiques",
            cooldown: 5000,
            aliases: ["topgame"],
            permLevel: 0,
            permission: "VIEW_CHANNEL",
            allowDMs: false
        });
    }

    async run(message) {

        // —— Database connection
        const { USER, DB, MDP, HOST } = this.client.config.bdd;
        var database = mysql.createConnection({ host: HOST, user: USER, password: MDP, database: DB, charset: "utf8mb4", });

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `gamepoints`);

        if (DbConnection()) {
            database.query("SELECT username,game_points FROM users ORDER BY game_points DESC LIMIT 5", async function (err, result) {
                if (err) throw err;
                const Embed = new MessageEmbed().setColor("BLACK")
                .setTitle('Le Top Gamer d\'Adolite:')
                .setTimestamp();

                for(let i = 0;i < result.length;i++){
                    Embed.addField(`${i + 1}. ${result[i].username}`, `\`\`\`tex\n$ ${result[i].game_points} points\`\`\``);
                }
                await message.channel.send(Embed);
                await database.end(function(err){
                    if(err) throw err;
                    console.log(`[Adolite]` + ` Base de données => ` + `Hors ligne`);
                });

              });
        }

        database.on('error', function () {
            DbConnection();
        });

        async function DbConnection() {
            database.connect(function (err) {
                if(err) throw err;
                console.log(`[Adolite]` + ` Base de données => ` + `En ligne`);
                return true;
            });
        }
    }
}

module.exports = Credits;