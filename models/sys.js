var Sequelize = require('sequelize');
var db = require('./db');


module.exports.SYSSession = db.define('sys_session', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true,
        comment: "sid",
    },
    data: {
        type: Sequelize.JSON,
        comment: "sesstion data",
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: "系统表－session"
});

module.exports.SYSQueueTask = db.define('sys_queue_task', {
    client: {
        type: Sequelize.STRING,
        comment: "客户代码",
    },
    people_id: {
        type: Sequelize.INTEGER,
        comment: "人员id",
    },
    queue_name: {
        type: Sequelize.STRING,
        comment: "队列的名称",
    },
    task_name: {
        type: Sequelize.STRING,
        comment: "任务名称",
    },
    start: {
        type: Sequelize.DATE,
        comment: "开始时间",
    },
    end: {
        type: Sequelize.DATE,
        comment: "结束时间",
    },
    task_cmd: {
        type: Sequelize.STRING,
        comment: "函数",
    },
    task_params: {
        type: Sequelize.JSON,
        comment: "函数的参数",
    },
    progress: {
        type: Sequelize.INTEGER,
        comment: "进度"
    },
    status: {
        type: Sequelize.INTEGER,
        comment: "任务状态 0: 未开始 1:运行中 2:完成 3:暂停 4:取消 9:错误",
    },
    retry: {
        type: Sequelize.BOOLEAN,
        comment: "是否重试过"
    },
    attempts: {
        type: Sequelize.INTEGER,
        comment: "重试的次数",
    },
    max_attempts: {
        type: Sequelize.INTEGER,
        comment: "最大重试次数",
    },
    result: {
        type: Sequelize.JSON,
        comment: "运行结果",
    },
    error: {
        type: Sequelize.JSON,
        comment: "错误信息",
    },
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: "系统表－异步任务"
});

module.exports.SYSLandscape = db.define('sys_landscape', {
    fsign: {
        type: Sequelize.STRING,
        primaryKey: true,
        comment: "功能的签名字符串，主键，不可重复",
    },
    system: {
        type: Sequelize.STRING,
        comment: "所属系统 sys hr crm oa srm",
    },
    package: {
        type: Sequelize.STRING,
        comment: "包 om pa 等",
    },
    module: {
        type: Sequelize.STRING,
        comment: "模块 company等",
    },
    function: {
        type: Sequelize.STRING,
        comment: "功能 list form ",
    },
    name: {
        type: Sequelize.STRING,
        comment: "名称",
    },
    type: {
        type: Sequelize.STRING,
        comment: "类型： I:接口 P:页面",
    },
    method: {
        type: Sequelize.STRING,
        comment: "方法 GET POST PUT DELETE PATCH",
    },
    // 网站
    url_site: {
        type: Sequelize.STRING,
        comment: "访问地址，一般为不带域名的绝对路径",
    },
    title_site: {
        type: Sequelize.STRING,
        comment: "菜单或按钮的标题，仅对页面类型的url有效",
    },
    icon_site: {
        type: Sequelize.STRING,
        comment: "图标的class，仅对页面类型的url有效",
    },
    status_site: {
        type: Sequelize.INTEGER,
        comment: "功能状态 0: 未上线 1:已上线 2:已下线(维护中) 9:废弃",
    },
    // 微信企业号
    url_wx: {
        type: Sequelize.STRING,
        comment: "访问地址，一般为不带域名的绝对路径",
    },
    title_wx: {
        type: Sequelize.STRING,
        comment: "菜单或按钮的标题，仅对页面类型的url有效",
    },
    icon_wx: {
        type: Sequelize.STRING,
        comment: "图标的class，仅对页面类型的url有效",
    },
    status_wx: {
        type: Sequelize.INTEGER,
        comment: "功能状态 0: 未上线 1:已上线 2:已下线(维护中) 9:废弃",
    },
    // 阿里钉钉
    url_dt: {
        type: Sequelize.STRING,
        comment: "访问地址，一般为不带域名的绝对路径",
    },
    title_dt: {
        type: Sequelize.STRING,
        comment: "菜单或按钮的标题，仅对页面类型的url有效",
    },
    icon_dt: {
        type: Sequelize.STRING,
        comment: "图标的class，仅对页面类型的url有效",
    },
    status_dt: {
        type: Sequelize.INTEGER,
        comment: "功能状态 0: 未上线 1:已上线 2:已下线(维护中) 9:废弃",
    },

}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: "系统表－系统功能单"
});

module.exports.SYSRole = db.define('sys_role', {
    code: {
        type: Sequelize.STRING,
        primaryKey: true,
        comment: "role code",
    },
    name: {
        type: Sequelize.STRING,
        comment: "role name",
    },
    description: {
        type: Sequelize.STRING,
        comment: "描述",
    },

}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: "系统表－角色"
});

// url can be *, use regexp to match
module.exports.SYSRoleFunc = db.define('sys_role_function', {
    role: {
        type: Sequelize.STRING,
        comment: "role code",
    },
    fsign: {
        type: Sequelize.STRING,
        comment: "功能的id，对应sys_landscape的pk",
    },
    exclude: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "0:包含 1:排除",
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    comment: "系统表－角色-功能－关系表"
});
