var cfg_data = {
    development: {
        enableCluster: false,
        enableQueueCluster: true,
        numCPUs: 2,
        numQueueCPUs: 2,
        port: 4000,
        name: 'TrantorProject',
        test_log: true,
        log_level: 4, // 0: 关闭所有不必要的log 1: 严重的系统错误 2:普通错误 3:警告信息 4:调试信息

        log_dir: 'logs',
        uri_prefix: 'https://www.jun1yun.com',
        CDN: 'https://www-cache.jun1yun.com',
        db: {
            host: 'localhost',
            port: 5432,
            database: 'hyperion',
            username: 'hyperion',
            password: '999888',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        // db: {
        //     host: 'rds92g2v93s97cd0vsxto.pg.rds.aliyuncs.com',
        //     port: 3433,
        //     database: 'hyperion',
        //     username: 'hyperion',
        //     password: '112578k431008',
        //     pool: {
        //         max: 5,
        //         min: 0,
        //         idle: 10000
        //     }
        // },
        redis: {
            host: "127.0.0.1",
            port: 6379,
            opts: {
                auth_pass: ""
            },
        },
        aliyun: {
            accessKeyId: "q8o2VlCFY5LeCc60",
            accessKeySecret: "5xJCccB3mqvOxqySTrKABva5HzhAyr",
            oss: {
                'bucket': 'avatar-jun1yun',
                'region': 'oss-cn-hangzhou'
            }
        },
        alidayu: {
            app_key: "23262699",
            app_secert: "9348937665c3dd8f52235dca2832a741"
        },
    },
    production: {
        enableCluster: false,
        enableQueueCluster: true,
        numCPUs: 2,
        numQueueCPUs: 2,
        port: 4000,
        name: 'TrantorProject',
        test_log: true,
        log_level: 4, // 0: 关闭所有不必要的log 1: 严重的系统错误 2:普通错误 3:警告信息 4:调试信息

        log_dir: './',
        uri_prefix: 'https://www.jun1yun.com',
        CDN: 'https://www-cache.jun1yun.com',
        db: {
            host: 'rds92g2v93s97cd0vsxt.pg.rds.aliyuncs.com',
            port: 3433,
            database: 'hyperion',
            username: 'hyperion',
            password: '112578k431008',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        redis: {
            host: "127.0.0.1",
            port: 6379,
            opts: {
                auth_pass: ""
            },
        },
        aliyun: {
            accessKeyId: "q8o2VlCFY5LeCc60",
            accessKeySecret: "5xJCccB3mqvOxqySTrKABva5HzhAyr",
            oss: {
                'bucket': 'zhaoniuren',
                'region': 'oss-cn-hangzhou'
            }
        },
        alidayu: {
            app_key: "23262699",
            app_secert: "9348937665c3dd8f52235dca2832a741"
        },
    },

};

var env = process.env.NODE_ENV || 'development';
module.exports = cfg_data[env];
