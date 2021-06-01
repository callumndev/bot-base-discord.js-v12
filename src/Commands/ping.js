class PingCommand extends CommandBase {
    constructor() {
        super( { name: 'ping' } )
    };

    execute( message, args ) {
        message.channel.send()
    };
};

module.exports = PingCommand;