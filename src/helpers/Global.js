const lib = l => require( '../libraries/' + l );
const helper = h => {
    global[ h ] = require( '../helpers/' + h );
};

const depNames = {
    'discord.js': 'discord'
};

module.exports = () => {
    try {
        global.getEnv = process.platform == 'linux' ? 'production' : 'development';
        global.isProd = getEnv == 'production';
        global.isDev = getEnv == 'development';

        const { dependencies } = require( '../../package.json' );
        if ( dependencies.length <= 0 ) return;
        
        for ( let dep in dependencies ) {
            global[ depNames[ dep.toLowerCase() ] ?? dep.toLowerCase() ] = require( dep );
        };

        global.LibBase = lib( 'LibBase' );
        global.RedisBase = lib( 'RedisBase' );
        global.structures = lib( 'StructureManager' );
        
        helper( 'checkType' );
        helper( 'className' );
        helper( 'isClass' );

    } catch ( e ) {
        console.log( 'Global Helper:', e.message );
    };
};