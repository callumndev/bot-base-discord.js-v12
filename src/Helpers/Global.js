const util = u => {
    global[ u ] = require( '../Utils/' + u );
};
const helper = h => {
    global[ h ] = require( '../Helpers/' + h );
};
const lib = l => require( '../Libraries/' + l );

const depNames = {
    'discord.js': 'discord',
    'ioredis': 'redis'
};

module.exports = () => {
    try {
        global.getEnv = process.platform == 'linux' ? 'production' : 'development';
        global.isProd = getEnv == 'production';
        global.isDev = getEnv == 'development';

        global.Roles = {};

        util( 'logger' );
        util( 'msg' );

        helper( 'checkType' );
        helper( 'className' );
        helper( 'isClass' );
        helper( 'classFuncs' );
        helper( 'lowerFirst' );

        const { dependencies } = require( '../../package.json' );
        if ( dependencies.length <= 0 ) return;
        
        for ( let dep in dependencies ) {
            global[ depNames[ dep.toLowerCase() ] ?? dep.toLowerCase() ] = require( dep );
        };

        const redisConfig = require( '../config.json' );
        global.redisClient = new redis( {
            host: redisConfig[ 'redis_client_host:' + getEnv ],
            password: redisConfig.redis_client_password,
            user: redisConfig.redis_client_user,
            db: redisConfig.redis_client_db
        } );

        global.LibBase = lib( 'LibBase' );
        global.RedisBase = lib( 'RedisBase' );
        global.structures = lib( 'StructureManager' );
        global.EventManager = lib( 'EventManager' );
        global.EventBase = lib( 'EventBase' );
        

    } catch ( e ) {
        console.log( '[Global Helper :: Error]', e.message, '\n', e.stack );
    };
};