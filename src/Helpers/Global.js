module.exports = () => {
    try {
        // Vars
        global.procEnv = process.platform == 'linux' ? 'production' : 'development';
        global.isProd = procEnv == 'production';
        global.isDev = procEnv == 'development';
        global.invisChar = '⠀';
        
        global.Roles = {};
        global.Data = data;
        global._Config = require( '../config.json' );


        // Dependencies
        const { dependencies } = require( '../../package.json' );
        if ( dependencies.length <= 0 ) return;

        for ( let dependency in dependencies ) {
            let overrides = {
                'discord.js': 'discord',
                'ioredis': 'redis',
                'discord-command-parser': 'commandParser',
                'os': '_os'
            };

            dep( dependency.toLowerCase(), overrides[ dependency ] );
        };


        // Utils
        util( 'escape' );
        util( 'logger' );
        util( 'msg' );
        util( 'classes' );
        util( 'data' );
        util( 'ms' );


        // Helpers
        helper( 'checkType' );
        helper( 'lowerFirst' );
        helper( 'upperFirst' );
        helper( 'flatten' );
        helper( 'isJSONString' );
        helper( 'date' );
        helper( 'codeBlock' );


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
        global.EventBase = lib( 'EventBase' );
        global.EventManager = lib( 'EventManager' );
        global.CommandBase = lib( 'CommandBase' );
        global.CommandManager = new ( lib( 'CommandManager' ) )().init();
    } catch ( e ) {
        console.error( '[Global Helper :: Error]', e.message, '\n', e.stack );
        process.exit( 1 );
    };
};