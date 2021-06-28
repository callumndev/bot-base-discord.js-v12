class Guild extends discord.Guild {
    constructor( ...args ) {
        super( ...args );
    };
    
    rolesWithLevel( level ) {
        return this.roles.cache.filter( r => r.permissionLevel == level );
    };

    get settings() {
        return new ( structure( 'GuildSettings' ) )( this.id );
    };
};


module.exports = Guild;