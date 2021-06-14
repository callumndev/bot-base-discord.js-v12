const buildConfig = require( './Utils/buildConfig.js' ),
    __config = require( './config.js' ),
    setupGlobal = require( './Helpers/Global.js' ),
    Bot = require( './Bot.js' );

buildConfig( __config );
setupGlobal();


try {
    ( async () => {
        global.bot = await new Bot().init();
    } )();
} catch ( e ) {
    logger.error( '[Bot Error] ' + e.message, '\n', e.stack );
};