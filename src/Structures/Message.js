class Message extends discord.Message {
    constructor( ...args ) {
        super( ...args );
    };

    async parsed() {
        if ( !this.guild ) return;
        
        return commandParser.parse( this, await this.guild.settings.get( 'prefix' ), { ignorePrefixCase: true } );
    };

    async isCommand() {
        return CommandManager.validate( ( await this.parsed() ).command );
    };

    async commandName() {
        return ( await this.parsed() ).command;
    };

    async command() {
        return CommandManager.get( await this.commandName() );
    };
};


module.exports = Message;