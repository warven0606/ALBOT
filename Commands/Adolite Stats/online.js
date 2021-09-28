/* › Commands / Online.js ————————————————————————————————————————————————————————

   — Envoie une requête à la base de donnée pour 
   afficher le nombre d'utilisateurs connectés sur Adolite.online.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Importation de la base des commandes
    const Command = require("../Command"),
            mysql = require('mysql'),
      { MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Online extends Command {

    constructor(client) {
        super(client, {
            name: "online",
            description: "Affiche le nombre d'utilisateur(s) en ligne sur Adolite.",
            usage: "online",
            args: false,
            category: "Statistiques",
            cooldown: 5000,
            aliases: false,
            permLevel: 0,
            permission: "VIEW_CHANNEL",
            allowDMs: false
        });
    }

    async run(message) {

        // —— Database connection
        const { USER, DB, MDP, HOST } = this.client.config.bdd;
        var database = mysql.createConnection({ host: HOST, user: USER, password: MDP, database: DB, charset: "utf8mb4", });

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `online`);

        if (DbConnection()) {
            await database.query('SELECT users_online,rooms_loaded FROM server_status')
                .on('error', function (err) {
                    console.log(err);
                    return message.channel.send('Veuillez reéssayer ultérieurement !');
                })
                .on('result', async function (res) {

                    const genEmbed = new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle('Information Adolite:')
                        .addField(`Adolite connecté(s)`, `il y a ${res.users_online} connecté(s) dans l'hôtel.`)
                        .addField(`Appartement ouvert(s)`, `il y a ${res.rooms_loaded} appartement ouvert(s) dans l'hôtel.`)
                        .setTimestamp();

                    message.channel.send(genEmbed);
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
              console.log(`[Adolite]` + ` Base de données => ` + `En ligne`);
              return true;
            });
          }
    }
}

module.exports = Online;