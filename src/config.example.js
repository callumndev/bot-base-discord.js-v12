module.exports = {
    version: '1.0.0',
    client: {
        id: '854549669425971252',
        secret: 'secret',
        token: 'token',
        prefix: '!',
        announceUnknownCommands: false,
        author: '373965085283975171',
    },
    discord: {
        supportServerURL: 'https://discord.gg/QTZu5Vh73Y',
        guild: '853984623939813396',
        roles: {
            dev: '854058846972280893'
        },
        channels: {
            log: '853989633024196668',
            error: '853989643442978817',
            verbose: '853989681125654538',
            serverDebug: '857023784594309120'
        },
        cacheGuilds: true,
        cacheChannels: false,
        cacheOverwrites: false,
        cacheRoles: false,
        cacheEmojis: false,
        cachePresences: false,
        disabledEvents: []
    },
    presence: {
        status: 'dnd',
        afk: false,
        activity: {
            name: 'for {client.prefix}help',
            type: 'WATCHING',
            url: undefined
        }
    },
    redis: {
        client: {
            host: '127.0.0.1',
            password: 'password',
            user: 'username',
            db: 0
        }
    },
    logs: {
        suppress_verbose: false
    },
    emojis: {
        tick: '✅',
        cross: '❌'
    }
};