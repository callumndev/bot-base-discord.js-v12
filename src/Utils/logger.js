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


const chan = c => Config.get( [ 'discord.guild', `discord.channels.${ c }`, 'discord.disabledEvents' ] ).then( ( [ guild, chan, l ] ) => {
    if ( !guild ) throw this.verbose( `Ignoring invalid discord.guild in config.` );
    if ( !chan ) throw this.verbose( `Ignoring invalid channel ${ c } in config` );

    guild = bot.guilds.cache.get( guild );
    if ( !guild ) throw this.verbose( `Ignoring invalid discord.guild. Not found in client cache.` );
    
    bot.channels.fetch( chan ).then( c => {
        if ( !c ) throw this.verbose( `Ignoring invalid channel ${ c }. Not found in client cache.` );
    } );

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

    discord: {
        log( ...str ) {
            chan( 'log' ).then( c => {
                let time = date.formatted,
                    title = `Log - ${ time }`;
                
                c.embed( title, str.join( ' ' ), 'BLUE' );
            } )
            .catch( e => e );
        },
    
        error( ...str ) {
            chan( 'error' ).then( c => {
                c.send( '``` ```' );

                let time = date.formatted,
                    title = `Error - ${ time }`,
                    error,
                    summary,
                    attachment,
                    args = [];

                str.forEach( arg => {
                    console.log( typeof arg )
                    if ( arg instanceof Error ) {
                        let { name, message, stack } = arg;

                        error = {
                            name, 
                            message,
                            stack: [ '\`\`\`', stack, '\`\`\`' ].join( '\n' )
                        };

                        summary = Object.entries( error )
                            .map( ( [ k, v ] ) => `Error ${ upperFirst( k ) }: ${ v }` )
                            .join( '\n' );

                        attachment = new discord.MessageAttachment( Buffer.from( summary ), `${ title }.txt` );

                        c.embed( title, summary, 'RED', { files: [ attachment ] } );
                    } else {
                        args.push( arg );
                    };
                } );

                if ( args.length >= 1 ) {
                    c.embed( title, args.join( ' ' ), 'RED' );
                };
            } )
            .catch( e => e );
        },
        verbose( ...str ) {
            chan( 'verbose' ).then( c => {
                let time = date.formatted,
                    title = `Log (Verbose) - ${ time }`;
                
                c.embed( title, str.join( ' ' ), 'GREY' );
            } )
            .catch( e => e );
        }
    }
};

process.on( 'uncaughtException', ( err ) => {
    let log = module.exports;

    log.error( err );
    log.discord.error( err );
    
    // log.discord.error( 'EventManager.disable(): Either the name typeof param != string or that is not a registered event or the event is already disabled' );
    // log.discord.error( '[Global Helper :: Error]', 'message', '\n', 'stack' );
} );
