console.stdlog = console.log.bind( console );
console.logs = [];
console.log = function() {
    console.logs.push( Array.from( arguments ) );
    console.stdlog.apply( console, arguments );
};


let suppresses = 0;
function suppress() {
    suppresses++;

    const suppressedLog = s => `Suppressed ${ s } logs`;
    let lastLog = console.logs[ console.logs.length - 1 ]?.toString();

    if ( !!lastLog.startsWith( 'Suppressed' ) ) {
        process.stdout.clearLine();
        process.stdout.cursorTo( 0 );
    } else {
        suppresses = 1;
    };
    
    process.stdout.write( suppressedLog( suppresses ) );
    console.logs.push( suppressedLog( suppresses ) );
};


const chan = c => Config.get( [ 'discord.guild', `discord.channels.${ c }`, 'discord.disabledEvents' ] ).then( ( [ guild, chan ] ) => {
    if ( !guild ) throw this.verbose( `Ignoring invalid discord.guild in config.` );
    if ( !chan ) throw this.verbose( `Ignoring invalid channel ${ c } in config` );

    guild = bot.guilds.cache.get( guild );
    if ( !guild ) throw this.verbose( `Ignoring invalid discord.guild. Not found in client cache.` );
    
    let c = guild.channels.cache.get( chan );
    if ( !c ) throw this.verbose( `Ignoring invalid channel ${ c }. Not found in client cache.` );

    
    return bot.channels.fetch( chan );
} );


module.exports = {
    log( ...str ) {
        console.log( chalk.blue( '[Log]' ), chalk.bold( ...str ) );
    },

    error( ...str ) {
        console.log( chalk.red( '[Error]' ), chalk.bold( ...str ) );
    },

    verbose( ...str ) {
        if ( _Config[ 'logs.suppress.verbose' ] )
            suppress();
        else
            console.log( chalk.blue( '[Verbose]' ), chalk.grey( ...str ) );
    },


    discord: new Proxy( {}, {
        get( _, property ) {
            if ( property == 'error' ) return ( ...str ) => this.error( ...str );
            
            return ( ...str ) => chan( property ).then( c => {
                let time = date.formatted,
                    title = `${ upperFirst( property ) } - ${ time }`;
                    
                c.embed( title, str.join( ' ' ), 'BLUE' );
            } );
        },

        error: ( ...str ) => {
            chan( 'error' ).then( c => {
                let time = date.formatted,
                    title = `Error - ${ time }`,
                    error,
                    summary,
                    attachment,
                    args = [];

                str.forEach( arg => {
                    if ( arg instanceof Error ) {
                        let { name, message, stack } = arg;

                        error = {
                            name,
                            message: escape( message ),
                            stack: codeBlock( stack )
                        };

                        summary = Object.entries( error )
                            .map( ( [ k, v ] ) => `Error ${ upperFirst( k ) }: ${ v }` )
                                .join( '\n' );

                        attachment = new discord.MessageAttachment( Buffer.from( summary ), `${ title }.txt` );

                        c.embed( title, summary, 'RED', { files: [ attachment ], content: '@everyone' } );
                    } else {
                        args.push( arg );
                    };
                } );

                if ( args.length >= 1 ) {
                    c.embed( title, args.join( ' ' ), 'RED', { content: '@everyone' } );
                };
            } );
        }
    } )
};

process.on( 'uncaughtException', ( err ) => {
    let log = module.exports;

    log.error( err.stack );

    if ( typeof bot != 'undefined' ) {
        log.discord.error( err );
    };
} );