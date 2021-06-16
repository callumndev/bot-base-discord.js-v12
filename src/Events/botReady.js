class BotReady extends EventBase {
    constructor() {
        super( { name: 'Bot Ready' } );
    };

    onReady( bot ) {
        let g = bot.guilds.cache.size,
            u = bot.users.cache.size,
            onlineLog = `${ bot.user.username } is online with ${ g } guild${ g == 1 ? '': 's' } & ${ u } user${ u == 1 ? '': 's' }`;

        this.log( onlineLog );
        logger.discord.log( `${ onlineLog }\n\nVersion: ${ procEnv }` );

        ( async () => bot.user.setPresence( {
            status: await Config.get( 'presence.status' ),
            afk: await Config.get( 'presence.afk' ),
            activity: {
                name: await Config.get( 'presence.activity.name' ),
                type: await Config.get( 'presence.activity.type' ),
                url: await Config.get( 'presence.activity.url' )
            }
        } ) )();
    };
};


module.exports = BotReady;