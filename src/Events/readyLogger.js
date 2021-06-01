class ReadyLogger extends EventBase {
    constructor() {
        super( { name: 'Ready Logger' } )
    };

    onReady( bot ) {
        let g = bot.guilds.cache.size;
        let u = bot.users.cache.size;

        this.log( `${ bot.user.username } is online with ${ g } guild${ g == 1 ? '': 's' } & ${ u } user${ u == 1 ? '': 's' }` );
    };
};

module.exports = ReadyLogger;