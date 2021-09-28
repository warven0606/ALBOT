/* › Commands / Crédits.js ————————————————————————————————————————————————————————

   — Envoie une requête à la base de donnée pour 
   afficher le top Joueurs en nombre de crédits sur Adolite.online.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Importation de la base des commandes
const Command = require("../Command"),
    mysql = require('mysql'),
    { MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Articles extends Command {

    constructor(client) {
        super(client, {
            name: "articles",
            description: "Affiche le top Joueur en nombre de points Discord.",
            usage: "article",
            args: false,
            category: "Staff",
            cooldown: 5000,
            aliases: ["article"],
            permLevel: 0,
            permission: "VIEW_CHANNEL",
            allowDMs: false
        });
    }

    async run(message) {

        // —— Database connection
        const { USER, DB, MDP, HOST } = this.client.config.bdd;
        var database = mysql.createConnection({ host: HOST, user: USER, password: MDP, database: DB, charset: "utf8mb4", });

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `discord`);

        if (DbConnection()) {
            database.query("SELECT pseudo,points FROM dashboard_classement ORDER BY points DESC LIMIT 5", async function (err, result) {
                if (err) throw err;
                const Embed = new MessageEmbed().setColor("YELLOW")
                .setTitle('Les plus haut en points sur le Discord:')
                .setURL('https://www.adolite.fr/palmaresdiscord')
                .setTimestamp();

                for(let i = 0;i < result.length;i++){
                    Embed.addField(`${i + 1}. ${result[i].pseudo}`, `\`\`\`tex\n$ ${result[i].points} point(s)\`\`\``);
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

module.exports = Articles;