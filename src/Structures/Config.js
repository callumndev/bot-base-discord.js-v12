class Config extends RedisBase {
    constructor() {
        super();

        this._config = new Map();
    };

    merge( table ) {
        for ( const [key, value] of Object.entries( table ) ) {
            this.set( key, value );
        };

        return this;
    };

    set( key, val ) {
        return this._config.set( key, val );
    };
    
    get( key ) {
        return this._config.get( key );
    };
};


module.exports = Config;
module.exports.makeGlobal = true;