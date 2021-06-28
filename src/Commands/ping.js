class PingCommand extends CommandBase {
    constructor() {
        super( {
            name: 'ping',
            level: 'mod',
            botLevel: 'mod'
        } );
    };

    execute1( message ) {
        message.channel.send( 'Pong' )
    };
};


module.exports = PingCommand;