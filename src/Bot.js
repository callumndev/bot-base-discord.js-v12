const { Client } = require( 'discord.js' );
const lib = l => { l = require( './Libraries/' + l ); return new l(); };

module.exports = class extends Client {
    constructor( options ) {
        super( options );
        this._options = options;

        this.structures = lib( 'StructureManager' ).init();
    };

    async init() {
        await Config.merge( require( './config.json' ) );

        this.options.presence = {
            status: await Config.get( 'presence_status' ),
            activity: {
                name: await Config.get( 'presence_activity_name' ),
                type: await Config.get( 'presence_activity_type' )
            }
        };
        
        try {
            this.login( await Config.get( 'token' ) );
        } catch ( e ) {
            console.log( '[Bot Error :: Init :: Login] ' + e.message, '\n', e.stack );
        };

        return this;
    }
};