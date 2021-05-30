class RedisBase extends LibBase {
    constructor( options ) {
        super( { name: 'Redis Base' } );

        if ( !options )
            options = {};
        
        if ( !options.hash )
            options.hash = 'bot';
        
        this._options = options;
    };

    async _set( key, val ) {
        return await redisClient.hset( this._options.hash, key, val );
    };
    
    async _get( key ) {
        return await redisClient.hget( this._options.hash, key );
    };
};

module.exports = RedisBase;