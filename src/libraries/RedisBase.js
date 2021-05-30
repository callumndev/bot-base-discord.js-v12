// const client = redis.createClient( {
//     host: Config.get( 'redis_client_host' ),
//     password: Config.get( 'redis_client_password' ),
//     user: Config.get( 'redis_client_user' ),
//     db: Config.get( 'redis_client_db' )
// } );


// class RedisManager {
//     constructor( hash ) {
//         this._hash = hash;
//         console.log( 'redis hash ' + this._hash )
//     };

//     _set( key, val ) {
//         return client.hset( this._hash, key, val );
//     };

//     _get( key ) {
//         return client.hget( this._hash, key );
//     };
// };

// module.exports = RedisManager;

class RedisBase extends LibBase {
    constructor( options ) {
        super( { name: 'Redis Base' } );
        this._options = options;
    };

};

module.exports = RedisBase;