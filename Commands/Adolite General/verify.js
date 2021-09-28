/* › Commands / Rank.js ————————————————————————————————————————————————————————

   — Rank un membre sur le site.

     ヽ( •_•)O´¯`°.¸.·´¯`Q(^o^ )`                                              */

// ██████ Integrations █████████████████████████████████████████████████████████

// —— Importation de la base des commandes
const Command = require("../Command"),
    mysql = require('mysql'),
    { MessageEmbed } = require("discord.js");


// ██████ | ███████████████████████████████████████████████████████████ | ██████

// —— Créé & exporte une classe
class Verify extends Command {

    constructor(client) {
        super(client, {
            name: "verify",
            description: "Permet de relier son compte discord à celui d'Adolite",
            usage: "verify",
            args: false,
            category: "General",
            cooldown: 5000,
            aliases: false,
            permLevel: 0,
            permission: "VIEW_CHANNEL",
            allowDMs: false
        });
    }

    async run(message, args) {

        // —— Database connection
        const { USER, DB, MDP, HOST } = this.client.config.bdd;
        var database = mysql.createConnection({ host: HOST, user: USER, password: MDP, database: DB, charset: "utf8mb4", });
        
        console.log(`[Adolite]:${message.author.tag}` + ` Utilisation => ` + `verify`);

        if (DbConnection()) {
            message.delete();
            database.query(
                'SELECT username,discord_id,discord_verify FROM users WHERE discord_token = ?',
                [args.join(' ')],
                async function (err, results) {
                    if(err) return console.log(err) && message.channel.send('```diff\n- Une erreur est survenue, reéssayez ultérieurment !```');
                    if (!results) return console.log("Aucun résultat");

                    if (results.length > 0) {
                        let username = results[0].username;
                        let verify = results[0].discord_verify;
                        let id = results[0].discord_id;

                        if (message.author.id !== id) {
                            message.channel.send('Le token que vous avez saisis, ne correspond pas à votre compte !');
                            console.log(`${message.author.username}#${message.author.discriminator}(${message.author.id}) a essayé d'utiliser un token qui ne lui appartener pas.`);
                            return;
                        }


                        if (verify > 0) return console.log(err) && message.channel.send('Ton compte est déja lié à Adolite !');

                        database.query(
                            'UPDATE users SET discord_verify = ?, discord_token = ? WHERE username = ?',
                            ['1', '', username],
                            function (err, results) {
                                if(err) return message.channel.send('```diff\n- Une erreur est survenue, reéssayez ultérieurement !```');
                                console.log(`Le compte de ${username} a été vérifié !`);
                                Dbdisconnect();
                            }
                        );
                        try {
                            message.member.setNickname(username);
                            message.member.roles.add('839595514470858803');
                        } catch (e){
                            console.log(e);
                        }

                        let Embed = new MessageEmbed()
                            .setTitle(`Bravo ${username} !`)
                            .setColor("GREEN")
                            .setDescription("Ton compte discord est désormais lié à ton compte Adolite ! ✅")
                            .setTimestamp();

                        await message.channel.send(Embed);
                    } else {
                        Dbdisconnect();

                        let Embed = new MessageEmbed()
                            .setTitle(`Oops ${message.author.username}!`)
                            .setColor("RED")
                            .setDescription("Vérifier que les caractères que vous avez saisis correspondent à ceux du site ! ❌")
                            .setTimestamp();
                        return message.channel.send(Embed);
                    }
                    if (err) return console.log(err);

                }
            );
        }
        database.on('error', function () {
            DbConnection();
        });

        async function Dbdisconnect(){
            await database.end(function(err){
                if(err) throw err;
                console.log(`[Adolite]` + ` Base de données => ` + `Hors ligne`);
            });
        }

        async function DbConnection() {
            database.connect(function (err) {
                console.log(`[Adolite]` + ` Base de données => ` + `En ligne`);
                return true;
            });
        }
    }
}

module.exports = Verify;