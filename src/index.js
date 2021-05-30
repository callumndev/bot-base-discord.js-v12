const setupGlobal = require( './helpers/Global.js' )
setupGlobal();


const Bot = require( './Bot.js' );
try {
    global.bot = new Bot().init();
} catch ( e ) {
    console.log( '[Bot Error] ' + e.message );
};