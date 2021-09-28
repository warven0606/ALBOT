
/* › Commands / Template.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Instagram extends Command {

    constructor(client) {
        super(client, {
            name        : "instagram",
            description : "Voir le profil instagram d'un(e) ami(e) !",
            usage       : "instagram",
            args        : true,
            category    : "fun",
            cooldown    : 5000,
            aliases     : ["ig"],
            permLevel   : 0,
            permission  : "VIEW_CHANNEL",
            allowDMs    : false
        });
    }

    async run(message, args) {

        const client = this.client;

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `Instagram`);

        let name = args[0];

        //if there is no name send a message to the channel
        if(!name) return message.channel.send('Entre un compte pour pouvoir rechercher');
    
        await insta(name).then(res => {
    
          //create a new embed with the result info and send it to the channel
          let embed = new MessageEmbed()
            .setColor(pink)
            .setTitle(res.fullName)
            .setURL(res.link)
            .setThumbnail(res.profilePicHD)
            .addField('Profile info:', stripIndents`**Username:** ${res.username}
            **Nom entier:** ${res.fullName}
            **Bio:** ${res.biography.length == 0 ? 'None' : res.biography}
            **Posts:** ${res.postsCount}
            **Abonnés:** ${res.subscribersCount}
            **Abonnements:** ${res.subscribtions}
            **Profil privé ?:** ${res.isPrivate ? 'Oui 🔐' : 'Non 🔓'}`)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
    
          message.channel.send(embed);
        }).catch(err => {
          console.log(err);
          return message.reply("Es-tu sûr que le compte existe vraiment ?");
        });
      

    }
}

module.exports = Instagram;