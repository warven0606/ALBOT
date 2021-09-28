// /* › Commands / Stats.js ————————————————————————————————————————————————————————

//    — Servez-vous de ce fichier pour créer une commande.

//      ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// // ██████ Integrations █████████████████████████████████████████████████████████

// // —— Import base command
const Command = require("../Command"),
{ MessageEmbed } = require("discord.js"),
fetch = require('node-fetch');


// // ██████ | ███████████████████████████████████████████████████████████ | ██████

// // —— Créé & exporte une classe
class Stats extends Command {

    constructor(client) {
        super(client, {
           name        : "stats",
           description : "Affiche les stastistiques détaillées de votre compte.",
           usage       : "{pseudo || @pseudo}",
           args        : true,
           category    : "Statistiques",
           cooldown    : 5000,
           aliases     : false,
           permLevel   : 0,
           permission  : "VIEW_CHANNEL",
           allowDMs    : false
       });
   }

   async run(message, args) {

       const client = this.client;

       console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `stats`);

       const Embed1 = new MessageEmbed().setColor('#F40707')
       .addField('Veuillez patienter...', 'Nous recherchons actuellement votre compte 🔁')
       .addField('Si le chargement persiste :', '|1| Nous avons une erreur.\n|2| Nous ne trouvons pas votre compte.\n|3| Petit bug reessaye. ')
       
       
       const SendMessage = await message.channel.send(Embed1);
       let search = args[0] ? message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(user => user.displayName.toLowerCase() === args[0].toLowerCase()) || client.users.cache.find(u => u.username.toLowerCase() === args[0].toLowerCase()) || message.mentions.users.first() || args[0] : message.author;

       let data = [];
       let error = "";
       try {

         const res = await fetch(`https://adolite.fr/api/api.php?id=${search.id ? search.id : search}`);
         data = await res.json();

         if(data && data.username){

           let OnlineTime = Math.round(data.OnlineTime / 3600);

           const Embed = new MessageEmbed().setColor("RANDOM")
           .setDescription(`Statistique du compte de ${data.username}`)
           .setFooter(`Demande effectuée par ${message.author.username}`, message.author.displayAvatarURL())
           .setTimestamp()
           .setThumbnail(`https://cdn.wibbo.org/habbo-imaging/avatarimage?figure==${data.look}&direction=2&action=std,crr=47`)
           .addField(`Pseudo`, data.username, true)
           .addField(`Description`, !data.motto || data.motto.length < 1 ? "Aucune" : decodeURIComponent(escape(data.motto)), true)
           .addField(`Points Gamer`, data.game_points < 1 ? "Aucun" : data.game_points, true)
           .addField(`Crédits`, data.credits, true)
           .addField(`Diamants`, data.vip_points, true)
           .addField(`Meilleur Mazo`, data.mazoscore, true)
           .addField(`Temps de connexion`, `${OnlineTime} ${OnlineTime > 1 ? "heures": "heure"}`, true)
           .addField(`Statuts`, data.online === "0" ? "[🔴] Hors ligne" : "[🟢] En ligne", true)
           .addField(`Date de création`, "le " + new Date(data.account_created*1000).toLocaleString(), true)
           .addField(`Dernière connexion`, data.online === "0" ? `Il y a ${data.last_online}` : "Maintenant", true)
           return SendMessage.edit(" ", Embed);
         }
         return SendMessage.edit(data ? data.message : ":x: Une erreur est survenue, réessayez !");

       } catch (e) {
         error = e.toString();
         console.log("erreur: " + error);
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