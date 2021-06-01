const setupGlobal = require( './Helpers/Global.js' )
setupGlobal();

const Bot = require( './Bot.js' );
try {
    ( async () => {
        global.bot = await new Bot().init();
    } )();
} catch ( e ) {
    logger.error( '[Bot Error] ' + e.message, '\n', e.stack );
};