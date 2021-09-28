/* › Commands / Diamants.js ————————————————————————————————————————————————————————

   — Envoie une requête à la base de donnée pour 
   afficher le top Joueurs en nombre de diamants sur Adolite.online.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Importation de la base des commandes
const Command = require("../Command"),
    mysql = require('mysql'),
    { MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Diamants extends Command {

    constructor(client) {
        super(client, {
            name: "diamants",
            description: "Affiche le top Joueur en nombre de diamants sur Adolite.",
            usage: "diamants",
            args: false,
            category: "Statistiques",
            cooldown: 5000,
            aliases: ["topdiamant"],
            permLevel: 0,
            permission: "VIEW_CHANNEL",
            allowDMs: false
        });
    }

    async run(message) {

        // —— Database connection
        const { USER, DB, MDP, HOST } = this.client.config.bdd;
        var database = mysql.createConnection({ host: HOST, user: USER, password: MDP, database: DB, charset: "utf8mb4", });
        
        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `diamants`);

        if (DbConnection()) {
            database.query("SELECT username,vip_points FROM users ORDER BY vip_points DESC LIMIT 5", async function (err, result) {
                if (err) throw err;
                const Embed = new MessageEmbed().setColor("BLUE")
                .setTitle('Les plus Riches (en diamants) d\'Adolite:')
                .setTimestamp();

                for(let i = 0;i < result.length;i++){
                    Embed.addField(`${i + 1}. ${result[i].username}`, `\`\`\`tex\n$ ${result[i].vip_points} diamants\`\`\``);
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

module.exports = Diamants;