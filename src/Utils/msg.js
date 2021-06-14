module.exports = ( c, ...args ) => {
    if ( c?.channel ) {
        c?.channel?.send( ...args );
    } else {
        c?.send( ...args );
    };
};