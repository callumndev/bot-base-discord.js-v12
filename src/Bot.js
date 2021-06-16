module.exports = class extends discord.Client {
    constructor( options ) {
        super( options );
        this._options = options;

        this.events = new ( lib( 'EventManager' ) )().init( this );
    };

    async init() {
        await Config.merge( require( './config.json' ) );
        
        try {
            this.login( await Config.get( 'token' ) );
        } catch ( e ) {
            logger.error( '[Client :: Init :: Login] ' + e.message, '\n', e.stack );
            logger.discord.error( '[Client :: Init :: Login] ' + e.message, '\n', e.stack );
        };
        
        return this;
    };
};