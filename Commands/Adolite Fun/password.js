
/* › Commands / Template.js ————————————————————————————————————————————————————————

   — Servez-vous de ce fichier pour créer une commande.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Discord = require('discord.js');
const Command = require("../Command");
const generator = require('generate-password');
const fetch = require('node-superfetch');

var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
var times = (`[${hour}:${minute}:${second}]/`);


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Password extends Command {

    constructor(client) {
        super(client, {
            name        : "password",
            description : "Pour générer un mot de passe",
            usage       : "password",
            args        : true,
            category    : "fun",
            cooldown    : 5000,
            aliases     : ["mdp"],
            permLevel   : 0,
            permission  : "READ_MESSAGES",
            allowDMs    : false
        });
    }

    async run(message) {

        const client = this.client;

        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `password`);
        message.reply("Combien de caractères souhaitez-vous ?");

    var nb_caract = "nd";
    var nombres = "nd";
    var symboles = "nd";

    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 300000 });

    collector.on('collect', message => {
        if(nb_caract === "nd" && nombres === "nd" && symboles === "nd"){
            if(isNaN(message.content)) return message.reply('veuillez entrer un nombre valide.');
            if(parseInt(message.content) > 100000) return message.reply('Min : 0 | Max : 100000')
            nb_caract = message.content;
            return message.reply('Le mot de passe peut-il contenir des nombres ? oui/non');
        }
        
        if(nb_caract !== "nd" && nombres === "nd" && symboles === "nd"){
            var response = message.content.toLowerCase();
            if(response !== "oui" && response !== "non") return message.reply('répondez par `oui` ou par `non` !');
            if(response === 'oui') nombres = true;
            if(response === 'non') nombres = false;
            return message.reply('Le mot de passe peut-il contenir des symboles ? oui/non');
        }
        if(nb_caract !== "nd" && nombres !== "nd" && symboles === "nd"){
            var response = message.content.toLowerCase();
            if(response !== "oui" && response !== "non") return message.reply('répondez par `oui` ou `non` !');
            if(response === 'oui') symboles = true;
            if(response === 'non') symboles = false;
            return collector.stop('ok');
        }
    });

    collector.on('end', (collected, reason) => {

        if(reason === "time") {
            return message.reply('Temps écoulé.').then(d => d.delete(5000));
        }
        if(reason === "ok") {
            var password = generator.generate({
                length: nb_caract,
                numbers: nombres,
                symboles: symboles
            });
            if(password.length > 1970){
                fetch.post(`https://hastebin.com/documents`).send(password).then(body => {
                    message.author.send('```Le mot de passe compte trop de caractères, il se trouve donc sur hastebin. Le lien : https://hastebin.com/'+body.body.key+'```');
                    return message.channel.send('✅ Mot de passe envoyé en message privé !');
                });
            }else {
            message.author.send('```Mot de passe généré : '+password+'```');
            return message.channel.send('✅ Mot de passe envoyé en message privé !');
        }}
        if(reason !== "time" && reason !== "ok"){
            return message.reply('erreur.').then(d => d.delete(5000));
        }
    });


        

    }
}

module.exports = Password;