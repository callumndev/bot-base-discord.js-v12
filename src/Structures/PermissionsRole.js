class Role extends discord.Role {
    constructor( ...args ) {
        super( ...args );
    };
    
    get permissionLevel() {
        let level = 'user';
        let rolePermissions = this.permissions.toArray();

        for ( const [ key, value ] of Object.entries( Data( 'permissions' ) ) ) {
            let incommon = value.filter( x => rolePermissions.includes( x ) );

            if ( incommon.length >= 1 ) {
                level = key;
            };
        };

        return level;
    };
};


module.exports = Role;