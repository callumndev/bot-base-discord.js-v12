class TextChannel extends discord.TextChannel {
    constructor( ...args ) {
        super( ...args );
    };

    embed( title, description, colour, extra ) {
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
            ...extra
        };
        return this.send( { embed } );
    }
};


module.exports = TextChannel;