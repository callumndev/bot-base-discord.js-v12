module.exports = async ( c, message, emoji, embed = false, embedTitle ) => {
    emoji = emoji ? `${ await Config.get( `emojis.${ emoji }` ) } - ` : '';
    let msg = `${ emoji }${ message }`;

    if ( c?.channel ) {
        let channel = c?.channel;

        if ( embed ) {
            channel?.embed( embedTitle, msg, 'BLUE', { message: c } );
        } else {
            channel?.send( `**${ msg }**`, { message: c } );
        };
    } else {
        c?.send( msg );
    };
};