
/* › Commands / Staffadd.js ————————————————————————————————————————————————————————

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Import base command
const Command = require("../Command");
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Staffadd extends Command {

    constructor(client) {
        super(client, {
            name        : "staffadd",
            usage       : "staffadd",
            args        : true,
            category    : "Staff",
            cooldown    : 5000,
            aliases     : ["joinimg"],
            permLevel   : 0,
            permission  : "MANAGE_MESSAGES",
            allowDMs    : false
        });
    }

    async run(message, args) {
        const client = this.client;
        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `Staffadd`);

        let nickname = args[0]? args[0].toLowerCase().trim() : "";
        const user = message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(user => user.displayName.toLowerCase() === nickname) || client.users.cache.find(u => u.username.toLowerCase() === nickname) || message.mentions.users.first();
        const role = message.guild.roles.cache.get(args[1]) || message.mentions.roles.first();
        if(!user || !role) return;

        const pole = message.guild.roles.cache.get(args[2]) || message.mentions.roles.find(roles => roles.id !== role.id);

        if(!pole) return;

        const canvas = Canvas.createCanvas(500, 500);
        const ctx = canvas.getContext('2d');

        var url = "https://cdn.discordapp.com/attachments/701934425113362444/786019748986749028/flusstaff2.png";
        
        const background = await Canvas.loadImage(url);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                
        ctx.font = '22px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`DEVIENT ${role.name.toUpperCase()} D'Adolite`, 52, 295);
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();


        const attachment = new MessageAttachment(canvas.toBuffer(), 'flux-staff.png');
    
        message.channel.send(`[${pole}] ${user} intègre l'équipe en tant que ${role}, nous lui souhaitons la bienvenue !`, attachment);
    }
}

module.exports = Staffadd;