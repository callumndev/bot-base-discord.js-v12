class Config extends RedisBase {
    constructor() {
        super();

        this._config = new Map();
    };

    async merge( table ) {
        for ( const [key, value] of Object.entries( table ) ) {
            await this.set( key, value );
        };

        return this;
    };

    async set( key, val ) {
        // return this._config.set( key, val );
        return await this._set( key, val );
    };
    
    async get( key ) {
        // return this._config.get( key );
        return await this._get( key );
    };
};


module.exports = Config;
module.exports.makeGlobal = true;