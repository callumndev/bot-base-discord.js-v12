class Guild extends discord.Guild {
    constructor( ...args ) {
        super( ...args );

        this.permissions = 'permissions2';
    };
    
    rolePower( role ) {
        let power = 0;
        return power;
    };
    
    rolesWithPower( power ) {
        return power;
    };
};


module.exports = Guild;