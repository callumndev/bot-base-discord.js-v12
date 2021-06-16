module.exports = () => {
    try {
        // Vars
        global.procEnv = process.platform == 'linux' ? 'production' : 'development';
        global.isProd = procEnv == 'production';
        global.isDev = procEnv == 'development';
        
        global.Roles = {};
        global.Data = data;
        global._Config = require( '../config.json' );


        // Dependencies
        const { dependencies } = require( '../../package.json' );
        if ( dependencies.length <= 0 ) return;

        for ( let dependencie in dependencies ) {
            let overrides = {
                'discord.js': 'discord',
                'ioredis': 'redis'
            };

            dep( dependencie.toLowerCase(), overrides[ dependencie ] );
        };


        // Utils
        util( 'logger' );
        util( 'msg' );
        util( 'classes' );
        util( 'data' );


        // Helpers
        helper( 'checkType' );
        helper( 'lowerFirst' );
        helper( 'upperFirst' );
        helper( 'flatten' );
        helper( 'isJSONString' );
        helper( 'date' );

        
        // Redis
        global.redisClient = new redis( {
            host: _Config[ 'redis.client.host' ],
            password: _Config[ 'redis.client.password' ],
            user: _Config[ 'redis.client.user' ],
            db: _Config[ 'redis.client.db' ]
        } );


        // Libraries
        global.LibBase = lib( 'LibBase' );
        global.RedisBase = lib( 'RedisBase' );
        global.structures = new ( lib( 'StructureManager' ) )().init(); // Needs to be initialized before client
        global.EventManager = lib( 'EventManager' );
        global.EventBase = lib( 'EventBase' );
    } catch ( e ) {
        console.error( '[Global Helper :: Error]', e.message, '\n', e.stack );
        process.exit( 1 );
    };
};