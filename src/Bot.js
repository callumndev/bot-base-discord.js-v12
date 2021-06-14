const { Client } = require( 'discord.js' );
const lib = l => { l = require( './Libraries/' + l ); return new l(); };

module.exports = class extends Client {
    constructor( options ) {
        super( options );
        this._options = options;

        this.events = lib( 'EventManager' ).init( this );
    };

    async init() {
        await Config.merge( require( './config.json' ) );
        
        try {
            this.login( await Config.get( 'token' ) );
        } catch ( e ) {
            logger.error( '[Client :: Init :: Login] ' + e.message, '\n', e.stack );
        };
        
        return this;
    };
};