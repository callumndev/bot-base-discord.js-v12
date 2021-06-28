class CommandBase extends LibBase {
    constructor( options ) {
        super( { name: `Command - ${ upperFirst( options.name ) }` } );

        this.options = options;
    };

    get isEnabled() {
        return this.options.enabled != false;
    };
    
    get disabledReason() {
        return this.options.disabledReason;
    };

    get permissionLevel() {
        return this.options.level ?? 'user';
    };
    
    get botPermissionLevel() {
        return this.options.botLevel ?? 'user';
    };
};


module.exports = CommandBase;