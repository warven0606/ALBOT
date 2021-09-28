class Error {

    constructor(client) {
        this.client = client;
    }

    async run(err) {

        console.log(err); 
                                                
    }
}

module.exports = Error;