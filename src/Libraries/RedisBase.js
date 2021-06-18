class RedisBase extends LibBase {
    constructor( options ) {
        if ( !options )
            options = {
                name: 'Redis Base'
            };

        if ( !options.hash )
            options.hash = 'bot';
        

        super( options );

        this._options = options;
    };

    async _set( key, val ) {
        return await redisClient?.hset( this._options.hash, key, checkType( val, 'object' ) ? JSON.stringify( val ) : val );
    };
    
    async _get( key ) {
        const get = async _key => {
            let val = await redisClient?.hget( this._options.hash, _key );

            return isJSONString( val ) ? JSON.parse( val ) : val;
        };

        return checkType( key, 'object' )
            ? Promise.all( key.map( async k => get( k ) ) ).then( values => values )
            : await get( key );
    };

    async _getAll() {
        return await redisClient?.hvals( this._options.hash );
    };

    async _delete( key ) {
        return await redisClient?.hdel( this._options.hash, key );
    };
};


module.exports = RedisBase;