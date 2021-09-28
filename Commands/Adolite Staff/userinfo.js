
/* › Commands / Userinfo.js ————————————————————————————————————————————————————————

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
      name: "userinfo",
      description: "Affiche les stastistiques détaillées d'un compte.",
      usage: "{Pseudo || @Pseudo || ID}",
      exemple: ["Warven"],
      args: true,
      category: "Staff",
      cooldown: 5000,
      aliases: false,
      permLevel: 0,
      permission: "VIEW_CHANNEL",
      allowDMs: true
    });
  }

  async run(message, args) {

    const client = this.client;

    console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `userinfo ${args.join(' ')}`);

    // —— Database connection
    const { USER, DB, MDP, HOST } = this.client.config.bdd;
    var database = mysql.createConnection({ host: HOST, user: USER, password: MDP, database: DB, charset: "utf8mb4", });
    if (DbConnection()) {
      database.query("SELECT id FROM users WHERE discord_id = ? AND discord_verify = ? AND rank >= ? LIMIT 1", [message.author.id, "1", "9"], async function (err, result) {
        if (err) return console.log(err) && DbDisconnection();
        if (!result || result.length < 1) return DbDisconnection() && message.channel.send('Pour utiliser cette commande tu dois faire partis de l\'équipe dev Adolite !');

        let nickname = args.join(' ') ? args.join(' ').toLowerCase().trim() : "";
        const user = message.guild.members.cache.get(args.join(' ')) || message.guild.members.cache.find(user => user.displayName.toLowerCase() === nickname) || client.users.cache.find(u => u.username.toLowerCase() === nickname) || message.mentions.users.first();

        if (!user || user.length < 1) return message.channel.send('Compte introuvable.') && DbDisconnection();

        database.query("SELECT * FROM users WHERE discord_id = ? AND discord_verify = ? LIMIT 1", [user.id, "1"], async function (err, result) {
          if (err) return console.log(err) && DbDisconnection();
          if (!result || result.length < 1) return DbDisconnection() && message.channel.send('L\'utilisateur n\'a pas lié son compte !');
          
          var stats = [];
          Object.keys(result).forEach(function (key) { stats.push(result[key]); });

          const Embed = new MessageEmbed().setColor("RANDOM")
            .setTitle(`Voici les statistiques du compte de ${stats[0].username}:`)
            .setFooter(`Statistiques du compte ${stats[0].username}`)
            .setTimestamp()
            .setThumbnail(`https://www.avatar-api.com/habbo-imaging/avatarimage.php?figure=${stats[0].look}&direction=2&action=std,crr=47`)
            .addField(`ID`, stats[0].id, true)
            .addField(`Pseudo`, stats[0].username, true)
            .addField(`Description`, !stats[0].motto || stats[0].motto.length < 1 ? "Aucune" : decodeURIComponent(escape(stats[0].motto)), true)
            .addField(`Adresse Email`, stats[0].mail, true)
            .addField(`Rank`, stats[0].rank, true)
            .addField(`Fonction`, stats[0].fonction === "null" ? "Joueur" : stats[0].fonction, true)
            .addField(`Meilleur Mazo`, stats[0].mazoscore, true)
            .addField(`Crédits`, stats[0].credits, true)
            .addField(`Diamants`, stats[0].vip_points, true)
            .addField(`Point(s) Gamer`, stats[0].game_points < 1 ? "Aucun" : stats[0].game_points, true)
            .addField(`Statuts`, stats[0].online === "0" ? "Hors ligne" : "En ligne", true)
            .addField(`Date de création`, new Date(stats[0].account_created * 1000).toDateString(), true)
            .addField(`Temps de connexion`, ` ${timeAgo2(stats[0].last_online)}`)
            .addField(`Dernière connexion`, stats[0].online === "0" ? `Il y a ${timeAgo(stats[0].last_online)}` : "Maintenant", true)
            .addField(`Première Adresse IP`, stats[0].ip_register, true)
            .addField(`Dernière Adresse IP`, stats[0].ip_last, true)
            .addField(`Adresse MAC`, stats[0].machine_id, true)

          return message.author.send(Embed)
            .then(() => {
              if (message.channel.type === 'dm') return;
              message.reply('je t\'ai envoyé un DM avec le résultat de la commande !');
            })
            .catch(error => {
              console.error(`N'a pas pu envoyer d'aide DM à ${message.author.tag}.\n`, error);
              message.reply('il semble que je ne puisse pas te DM ! Tu as les DM désactivées ?');
            }) && DbDisconnection();
        });


      });
    }

    database.on('error', function () {
      DbConnection();
    });

    async function DbDisconnection() {
      await database.end(function (err) {
        if (err) throw err;
        console.log(`[Adolite]` + ` Base de données => ` + `Hors ligne`);
      });
    }
    async function DbConnection() {
      database.connect(function (err) {
        if (err) throw err;
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