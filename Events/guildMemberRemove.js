class guildMemberRemove {

    constructor(client) {
        this.client = client;
    }

    async run(member) {
        console.log(`[Adolite] Départ => ${member.nickname}`);
        const client = this.client;

        

    }
}

module.exports = guildMemberRemove;