// Includers
let includers = [
    { name: 'util', folder: 'Utils', makeGlobal: true },
    { name: 'helper', folder: 'Helpers', makeGlobal: true },
    { name: 'dep', makeGlobal: true },
    { name: 'lib', folder: 'Libraries' },
    { name: 'data', folder: 'Data' },
];

includers.forEach( includer => {
    global[ includer.name ] = ( prop, override ) => {
        let req = require( `${ !!includer.folder ? `./${ includer.folder }/` : '' }${ prop }` );

        if ( !!includer?.makeGlobal ) {
            global[ override ?? prop ] = req;
        };

        return req;
    };
} );


// Init
dep( 'fs' );
dep( 'path' );

util( 'buildConfig' )

helper( 'flatten' );
helper( 'Global' );


buildConfig( require( './config.js' ) ), Global();


// Bot
try {
    let Bot = require( './Bot.js' );

    ( async () => {
        global.bot = await new Bot().init();
    } )();
} catch ( e ) {
    logger.error( '[Bot Error] ' + e.message, '\n', e.stack );
    logger.discord.error( '[Bot Error] ' + e.message, '\n', e.stack );
};