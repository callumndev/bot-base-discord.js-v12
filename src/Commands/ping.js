class PingCommand extends CommandBase {
    constructor() {
        super( {
            name: 'ping',
            level: 'mod',
            botLevel: 'mod'
        } );
    };

    execute( message ) {
        message.channel.send( 'Pong' )
    };
};


module.exports = PingCommand;