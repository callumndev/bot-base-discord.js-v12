const setupGlobal = require( './helpers/Global.js' )
setupGlobal();

const Bot = require( './Bot.js' );
try {
    ( async () => {
        global.bot = await new Bot().init();
    } )();
} catch ( e ) {
    console.log( '[Bot Error] ' + e.message, '\n', e.stack );
};