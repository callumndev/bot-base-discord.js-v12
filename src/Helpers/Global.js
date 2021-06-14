const util = u => {
    global[ u ] = require( '../Utils/' + u );
};
const helper = h => {
    global[ h ] = require( '../Helpers/' + h );
};
const lib = l => require( '../Libraries/' + l );
const data = d => require( '../Data/' + d );

const depNames = {
    'discord.js': 'discord',
    'ioredis': 'redis'
};

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
        
        for ( let dep in dependencies ) {
            global[ depNames[ dep.toLowerCase() ] ?? dep.toLowerCase() ] = require( dep );
        };

        // Utils
        util( 'logger' );
        util( 'msg' );
        util( 'classes' );
        util( 'data' );

        // Helpers
        helper( 'checkType' );
        helper( 'lowerFirst' );

        // Redis
        global.redisClient = new redis( {
            host: _Config.redis_client_host,
            password: _Config.redis_client_password,
            user: _Config.redis_client_user,
            db: _Config.redis_client_db
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