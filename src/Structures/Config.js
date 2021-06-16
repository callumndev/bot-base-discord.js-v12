class Config extends RedisBase {
    constructor() {
        super( { name: 'Redis Base - Config' } );

        this._config = new Map();
    };

    async merge( table ) {
        for ( const [key, value] of Object.entries( table ) ) {
            await this.set( key, value );
        };

        return this;
    };

    async set( key, val ) {
        return await this._set( key, val );
    };
    
    async get( key ) {
        return await this._get( key );
    };
};


module.exports = Config;
module.exports.makeGlobal = true;