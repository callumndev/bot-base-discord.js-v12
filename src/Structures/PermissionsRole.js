class Role extends discord.Role {
    constructor( ...args ) {
        super( ...args );
    };
    
    get power() {
        return 0;
    };
};


module.exports = Role;