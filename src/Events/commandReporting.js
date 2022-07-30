class CommandReporter extends EventBase {
    constructor() {
        super( { name: 'Command Reporter' } );

        let morePermsInfo = async message => {
            let prefix = await message.guild.settings.get( 'prefix' );

            return `\nFor more information on command permissions use \`${ escape( prefix ) }permissions\``;
        };

        this.reasons = {
            'disabled': async message => {
                let command = await message.command();

                return `it has been disabled by the developers${ command.disabledReason ? ` as ${ command.disabledReason }` : '' }`;
            },
            'blacklisted': 'this server is blacklisted',
            'permissions': async message => {
                let command = await message.command();

                return `you do not have permissions to use a ${ command.permissionLevel } command. ${ await morePermsInfo( message ) }`;
            },
            'botPermissions': async message => {
                let command = await message.command();

                return `I do not have permissions to use a ${ command.permissionLevel } command. ${ await morePermsInfo( message ) }`;
            },
            'execute': 'of an internal command error'
        };

        this.tab = `\n${ invisChar.repeat( 5 ) }`;
    };

    formatPropArr( arr ) {
        return arr
            .map( ( { prop, value } ) => `**${ prop }:** \`${ escape( value ) }\`` )
                .join( ' **::** ' )
                    .replaceAll( true, 'Yes' )
                        .replaceAll( false, 'No' );
    };
    
    async send( message, reason ) {
        let commandName = await message.commandName(),
            reasonLog = checkType( this.reasons[ reason ], 'function' ) ? await this.reasons[ reason ]( message ) : this.reasons[ reason ];
        
        msg(
            message,
            [
                `Command ${ commandName } failed to run`,
                this.reasons.hasOwnProperty( reason ) ? `because ${ reasonLog }` : ''
            ].join( ' ' ),
            'cross'
        );
    };

    
    async onCommandFailDisabled( message, reason ) {
        this.send( message, reason );
    };
    
    async onCommandFailBlacklisted( message, reason ) {
        this.send( message, reason );
    };
    
    async onCommandFailPermissions( message, reason ) {
        this.send( message, reason );
    };
    
    async onCommandFailBotPermissions( message, reason ) {
        this.send( message, reason );
    };
    
    async onCommandFailExecute( message, reason, err ) {        
        let commandName = await message.commandName(),
            command = await message.command(),
            author = message.member,
            guild = message.guild;
        
        const summary = [
            '**__Command Execute Error:__**',

            '',

            `\`${ err.message }\``,

            '',

            codeBlock( err.stack ),

            '**__Extra Info:__**',

            '',

            '**Command:**',
            this.formatPropArr(
                Object.entries( flatten( command ) )
                    .map( a => ( { prop: a[ 0 ], value: a[ 1 ] } ) )
            ),

            '',

            '**Author:**',
            `**\`${ escape( author.user.tag ) }\` (\`${ author.id }\`)**`,
            this.formatPropArr( [
                { prop: 'isDev',   value: author.isDev()         },
                { prop: 'isOwner', value: await author.isOwner() },
                { prop: 'isAdmin', value: await author.isAdmin() },
                { prop: 'isMod',   value: await author.isMod()   },
                { prop: 'isUser',  value: await author.isUser()  }
            ] ),

            '',

            '**Guild:**',
            `**\`${ escape( guild.name ) }\` (\`${ guild.id }\`) owned by (\`${ guild.ownerID }\`)**`,
            this.formatPropArr( [
                { prop: 'Large',        value: guild.large                            },
                { prop: 'Region',       value: guild.region                           },
                { prop: 'Member Count', value: guild.memberCount                      },
                { prop: 'Joined At',    value: `${ ms.format.long( Date.now() - guild.joinedTimestamp ) } ago` }
            ] )
        ].join( '\n' );

        this.error(
            `${ upperFirst( commandName ) } failed to execute because ${ err }`,
            this.tab,
            `Author: ${ escape( author.user.tag ) } (${ author.id })`,
            this.tab,
            `Guild: ${ escape( guild.name ) } (${ guild.id }) owned by (${ guild.ownerID })`
        );
        logger.discord.error( summary );

        CommandManager.disable( commandName, 'this command has experienced a internal error' );
        
        this.send( message, reason );
    };
};


module.exports = CommandReporter;