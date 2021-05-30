const { Client } = require( 'discord.js' );
const lib = l => { l = require( './libraries/' + l ); return new l(); };

module.exports = class extends Client {
    constructor( options ) {
        super( options );
        this._options = options;

        this.structures = lib( 'StructureManager' ).init();
    };

    init() {
        Config.merge( require( './config.json' ) );

        this.options.presence = {
            status: Config.get( 'presence_status' ),
            activity: {
                name: Config.get( 'presence_activity_name' ),
                type: Config.get( 'presence_activity_type' )
            }
        };
        
        this.login( Config.get( 'token' ) );

        return this;
    }
};