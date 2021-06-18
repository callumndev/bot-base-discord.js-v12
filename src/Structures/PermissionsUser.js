class GuildMember extends discord.GuildMember {
    constructor( ...args ) {
        super( ...args );
    };
    
    get permissionLevels() {
        let levels = this.roles.cache.map( role => role.permissionLevel );

        let checks = [
            { level: 'dev', check: () => this.guild.id == _Config[ 'discord.guild' ] && this.roles.cache.has( _Config[ 'discord.roles.dev' ] ) },
            { level: 'owner', check: () => this.guild.owner.id == this.id },
            { level: 'admin', check: () => levels.includes( 'admin' ) },
            { level: 'mod', check: () => levels.includes( 'mod' ) }
        ];

        for ( let i = 0; i < checks.length; i++ ) {
            let { level, check } = checks[ i ];
            let hasLevel = check();

            if ( hasLevel ) {
                levels.push( level );
            };
        };
        
        return levels.filter( ( item, index ) => levels.indexOf( item ) === index );
    };

    hasPermissionLevel( level ) {
        return this.permissionLevels.includes( level );
    };

    isDev() {
        return this.hasPermissionLevel( 'dev' );
    };

    async isOwner() {
        return new Promise( async resolve => resolve(
            this.hasPermissionLevel( 'owner' ) ||
            this.isDev() && await this.guild.settings.get( 'devOverride' ) == true
        ) );
    };

    async isAdmin() {
        return new Promise( async resolve => resolve(
            this.hasPermissionLevel( 'admin' ) ||
            this.isOwner() ||
            this.isDev() && await this.guild.settings.get( 'devOverride' ) == true
        ) );
    };
    
    async isMod() {
        return new Promise( async resolve => resolve(
            this.hasPermissionLevel( 'mod' ) ||
            this.isAdmin() ||
            this.isOwner() ||
            this.isDev() && await this.guild.settings.get( 'devOverride' ) == true
        ) );
    };
};


module.exports = GuildMember;