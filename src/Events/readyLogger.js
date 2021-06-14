class ReadyLogger extends EventBase {
    constructor() {
        super( { name: 'Ready Logger' } );
    };

    onReady( bot ) {
        let g = bot.guilds.cache.size,
            u = bot.users.cache.size;

        this.log( `${ bot.user.username } is online with ${ g } guild${ g == 1 ? '': 's' } & ${ u } user${ u == 1 ? '': 's' }` );

        ( async () => bot.user.setPresence( {
            status: await Config.get( 'presence_status' ),
            afk: await Config.get( 'presence_afk' ),
            activity: {
                name: await Config.get( 'presence_activity_name' ),
                type: await Config.get( 'presence_activity_type' ),
                url: await Config.get( 'presence_activity_url' )
            }
        } ) )();

        bot.guilds.cache.forEach( g => this.log( 'g', g.name, g.id2, 'e' ) );
    };
};


module.exports = ReadyLogger;