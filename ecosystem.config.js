module.exports = {
    apps : [
        {
            name: 'EPON API',
            script: 'index.js',
            watch: true,
            instances: 1,
            autorestart: true,
            max_memory_restart: '1G',
            //ignore_watch : ["node_modules", "output"],
            env: {
                NODE_ENV: 'local',
                port: 4208,

                dbUserMS: 'app',
                dbPasswordMS: 'SAGA38gt1979',
                dbServerMS: 'localhost',
                dbPortMS: 3306,
                dbDatabaseNameMS: 'epss_demo',
                dbMongoStringConnection: 'mongodb://localhost/epss_session',

            },
            env_dev: {
                NODE_ENV: 'development',
                port: 8090,

                dbUserMS: '',
                dbPasswordMS: '',
                dbServerMS: '',
                dbPortMS: 3306,
                dbDatabaseNameMS: '',
                dbMongoStringConnection: 'mongodb://localhost/epss_session',

            },
            env_testing: {
                NODE_ENV: 'testing',
                port: 8080,

                dbUserMS: '',
                dbPasswordMS: '',
                dbServerMS: '',
                dbPortMS: 3306,
                dbDatabaseNameMS: '',
                dbMongoStringConnection: 'mongodb://localhost/epss_session',
                NODE_TLS_REJECT_UNAUTHORIZED : "0"
            },
            env_production: {
                NODE_ENV: 'production',
            }
        }
    ]
}