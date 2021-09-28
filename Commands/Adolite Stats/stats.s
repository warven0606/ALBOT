
/* › Commands / Stats.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command"),
mysql = require("mysql"),
{ MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Stats extends Command {

    constructor(client) {
        super(client, {
            name        : "stats",
            description : "Affiche les stastistiques détaillées de votre compte.",
            usage       : "stats",
            args        : false,
            category    : "Statistiques",
            cooldown    : 5000,
            aliases     : false,
            permLevel   : 0,
            permission  : "VIEW_CHANNEL",
            allowDMs    : false
        });
    }

    async run(message) {

        const client = this.client;

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `stats`);

        // —— Database connection
        const { USER, DB, MDP, HOST } = this.client.config.bdd;
        var database = mysql.createConnection({ host: HOST, user: USER, password: MDP, database: DB, charset: "utf8mb4", });
        if (DbConnection()) {
            database.query("SELECT users.*, user_stats.OnlineTime FROM users, user_stats WHERE users.discord_id = ? AND users.discord_verify = ? AND user_stats.id = users.id LIMIT 1", [message.author.id, "1"], async function (err, result) {
  
                if (err) return console.log(err);
                
                const Embed = new MessageEmbed().setColor("RANDOM")
                .setTitle(`Voici les statistiques de ton compte:`)

                .setFooter(`Statistiques du compte ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp();

                var stats = [];
              





    
                Object.keys(result).forEach(function (key) {
                    stats.push(result[key]);

                
                });
          

                

               
                Embed
                .setThumbnail(`https://www.avatar-api.com/habbo-imaging/avatarimage?figure=${stats[0].look}&direction=2&action=std,crr=47`)
                .addField(`Pseudo`, stats[0].username, true)
                .addField(`Description`, !stats[0].motto || stats[0].motto.length < 1 ? "Aucune" : decodeURIComponent(escape(stats[0].motto)), true)
                .addField(`Meilleur Mazo`, stats[0].mazoscore, true)
                .addField(`Crédits`, stats[0].credits, true)
                .addField(`Diamants`, stats[0].vip_points, true)
                .addField(`Point(s) Gamer`, stats[0].game_points < 1 ? "Aucun" : stats[0].game_points, true)
              //  .addField(`Temps de connexion`, ` ${timeAgo2(stats[0].OnlineTime)}`)
                .addField(`Statuts`, stats[0].online === "0" ? "Hors ligne" : "En ligne", true)
                .addField(`Date de création`, new Date(stats[0]. account_created*1000).toDateString(), true)
                .addField(`Dernière connexion`, stats[0].online === "0" ? `Il y a ${timeAgo(stats[0].last_online)}` : "Maintenant", true);
                /*.addField(``, ``, true); */

                await message.channel.send(Embed);
                DbDisconnection();

              });
            
        }

        database.on('error', function () {
            DbConnection();
        });

        async function DbDisconnection(){
          await database.end(function(err){
              if(err) throw err;
              console.log(`[Adolite]` + ` Base de données => ` + `Hors ligne`);
          });
        }
        async function DbConnection() {
            database.connect(function (err) {
                if(err) return DbDisconnection();
                console.log(`[Adolite]` + ` Base de données => ` + `En ligne`);
                return true;
            });
        }


        function timeAgo2(date){
          var seconds = (new Date().getTime() / 1000 - date);

          var interval = seconds / (60 * 60)

          if (interval > 1) {
            return Math.floor(interval) + "h"
          }

        }





        function timeAgo(date) {
            var seconds = (new Date().getTime() / 1000 - date);
          
            var interval = seconds / (365 * 24 * 60 * 60);
          
            if (interval > 1) {
              return Math.floor(interval) + " ans";
            }
            interval = seconds / (30 * 24 * 60 * 60);
            if (interval > 1) {
              return Math.floor(interval) + " mois";
            }
            interval = seconds / (24 * 60 * 60);
            if (interval > 1) {
              return Math.floor(interval) + " jours";
            }
            interval = seconds / (60 * 60);
            if (interval > 1) {
              return Math.floor(interval) + " heures";
            }
            interval = seconds / 60;
            if (interval > 1) {
              return Math.floor(interval) + " minutes";
            }
            return Math.floor(seconds) + " secondes";
          }
        

        

          
    }
}

module.exports = Stats;