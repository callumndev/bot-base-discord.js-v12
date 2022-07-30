class CommandHandler extends EventBase {
    constructor() {
        super( { name: 'Command Handler' } );
    };

    async onMessage( message ) {
        if ( !( await message.parsed() )?.success ) return;

        bot.emit( `command${ await message.isCommand() ? '' : 'Unknown' }`, message );
    };

    async onCommand( message ) {
        let command = await message.command(),
            member = message.member,
            isDev = member.isDev(),
            isOwner = await member.isOwner(),
            isAdmin = await member.isAdmin(),
            isMod = await member.isMod(),
            isUser = await member.isUser();
        
        let botMember = await message.guild.members.cache.get( bot.user.id ),
            bot_isDev = botMember.isDev(),
            bot_isOwner = await botMember.isOwner(),
            bot_isAdmin = await botMember.isAdmin(),
            bot_isMod = await botMember.isMod(),
            bot_isUser = await botMember.isUser();

        try {
            let checks = [
                { name: 'disabled', check: () => !command.isEnabled },
                { name: 'blacklisted', check: async () => await message.guild.settings.get( 'blacklistStatus' ) == true },
                { name: 'permissions', check: () => {
                    return command.permissionLevel == 'dev' && !isDev ||
                        command.permissionLevel == 'owner' && !isOwner ||
                        command.permissionLevel == 'admin' && !isAdmin ||
                        command.permissionLevel == 'mod' && !isMod ||
                        command.permissionLevel == 'user' && !isUser;
                    }
                },
                { name: 'botPermissions', check: () => {
                    return command.botPermissionLevel == 'dev' && !bot_isDev ||
                        command.botPermissionLevel == 'owner' && !bot_isOwner ||
                        command.botPermissionLevel == 'admin' && !bot_isAdmin ||
                        command.botPermissionLevel == 'mod' && !bot_isMod ||
                        command.botPermissionLevel == 'user' && !bot_isUser;
                    }
                }
            ];
            
            for ( let i = 0; i < checks.length; i++ ) {
                let { name, check } = checks[ i ];
                let throwCheck = await check();
                
                if ( throwCheck ) {
                    throw name;
                };
            };

            try {
                let parsed = await message.parsed(),
                args = parsed.arguments;
                
                await command.execute( message, args );
            } catch ( e ) {
                throw {
                    reason: 'execute',
                    error: e
                };
            };
            
            bot.emit( 'commandRun', message );
        } catch ( reason ) {
            let err;
            
            if ( checkType( reason, 'object' ) ) {
                err = reason.error;
                reason = reason.reason;
            };


            bot.emit( 'commandFail', message, reason, err );
        };
    };
    
    async onCommandUnknown( message ) {
        let announceUnknownCommands = await Config.get( 'client.announceUnknownCommands' ),
            commandName = await message.commandName();
        
        if ( announceUnknownCommands == true ) {
            return message.channel.embed( 'Unknown Command', `${ commandName } is not a valid command`, 'RED' );
        };
    };

    async onCommandRun( message ) {
        let time = Date.now(),
            commandName = await message.commandName();
            
        // Last Command
        await message.guild.settings.set( 'commandsRan.last.time', time ); // commandsRan.last.time
        await message.guild.settings.set( 'commandsRan.last.command', commandName ); // commandsRan.last.command
        

        // Metrics

        /* Total Commands */
        let totalCommandsRan = await message.guild.settings.get( 'commandsRan.total' );
        await message.guild.settings.set( 'commandsRan.total', totalCommandsRan + 1 ); // commandsRan.total
        
        /* Individual Command */
        let commandRanTimes = await message.guild.settings.get( `commandsRan.${ commandName }` ) ?? 0;
        await message.guild.settings.set( `commandsRan.total.${ commandName }`, commandRanTimes + 1 ); // commandsRan.total.ping
        await message.guild.settings.set( `commandsRan.last.${ commandName }`, time ); // commandsRan.last.ping
    };

    async onCommandFail( message, reason, err ) {
        bot.emit( `commandFail${ upperFirst( reason ) }`, message, reason, err );
    };
};


module.exports = CommandHandler;