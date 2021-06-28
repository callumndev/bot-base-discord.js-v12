class CommandManager extends LibBase {
    constructor() {
        super( { name: 'Command Manager' } );

        this._commands = new Map();
    };

    init() {
        const commands = fs.readdirSync( path.join( __dirname, '..', 'Commands' ) );
        
        for ( let commandName of commands ) {
            const _command = command( commandName );
            
            try {
                this.register( _command );
            } catch ( e ) {
                this.error( `[init] Failed to register command ${ commandName } because ${ e.message }`, '\n', e.stack );
            };
        };
        
        return this;
    };

    validate( name ) {
        return this._commands.has( name );
    };

    status( name ) {
        if ( !checkType( name, 'string' ) )
            this.error( 'Error: typeof commandName != string' );
        
        if ( !this.validate( name ) )
            throw new Error( `${ name } is not a registered command` );

        return this.get( name )?.enabled != false;
    };

    get( name ) {
        return this._commands.get( name );
    };

    register( classFn ) {
        if ( !classes.isClass( classFn ) ) {
            return this.error( 'CommandManager.register(): One parameter is not the correct type' );
        };

        let command = new classFn();
        this._commands.set( command.options.name, command );

        this.log( `[register] Registered command ${ command.options.name }` );
    };

    disable( name, reason ) {
        if ( !checkType( name, 'string' ) || !this.validate( name ) || !this.status( name ) ) {
            return this.error( 'CommandManager.disable(): Either the name typeof param != string or that is not a registered command or the command is already disabled' );
        };

        let command = this._commands.get( name );
        command.options.enabled = false;
        command.options.disabledReason = reason;

        this._commands.set( name, command );
    };

    enable( name ) {
        if ( !checkType( name, 'string' ) || !this.validate( name ) || this.status( name ) ) {
            return this.error( 'CommandManager.enable(): Either the name typeof param != string or that is not a registered command or the command is already enabled' );
        };

        let command = this._commands.get( name );
        command.options.enabled = true;

        this._commands.set( name, command );
    };
};


module.exports = CommandManager;