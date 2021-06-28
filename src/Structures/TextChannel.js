class TextChannel extends discord.TextChannel {
    constructor( ...args ) {
        super( ...args );
    };

    async send( content, options ) {
        let botMember = await this.guild.members.cache.get( this.client.user.id ),
            isUser = await botMember.isUser();

        if ( !isUser ) {
            if ( botMember.hasPermission( [ 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'ADD_REACTIONS'] ) && checkType( options?.message?.react, 'function' ) ) {
                options.message.react( _Config[ 'emojis.cross' ] );
            };

            return;
        } else if ( !botMember.hasPermission( [ 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'] ) ) return;
        
        super.send( content, options );
    };

    async embed( title, description, colour, extra ) {
        if ( checkType( description, 'object' ) ) {
            let descStr = '';

            for ( const [ key, value ] of Object.entries( description ) ) {
                descStr += `\n\n${ key }: ${ value }`;
            };

            description = descStr;
        };

        let embed = {
            title,
            description,
            color: colour,
            footer: {
                text: `${ this.client.user.username } v${ await Config.get( 'version' ) } made by ${ this.client.users.cache.get( await Config.get( 'client.author' ) )?.tag } - ${ await Config.get( 'discord.supportServerURL' ) }`,
                url: await Config.get( 'discord.supportServerURL' ),
                iconURL: this.client.user.avatarURL()
            },
            ...extra
        };

        return this.send( extra?.content, { embed, message: extra?.message } );
    };
};


module.exports = TextChannel;